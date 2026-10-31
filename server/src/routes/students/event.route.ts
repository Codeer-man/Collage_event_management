import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { numberRequires, textRequired } from "../../utils/helper.js";
import { pool } from "../../config/pool.js";
import { AppError } from "../../utils/AppError.js";
import { generateParticipantPdf } from "../../lib/pdf.js";
import { ok } from "../../utils/envolve.js";
import { uploadImage } from "../../utils/cloudinary.js";
import { studentService } from "../../service/student.service.js";
import multer, { memoryStorage } from "multer";

export const eventRouter = express.Router();

function formatDate(date: string) {
  const dateObj = new Date(date);

  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth();

  return `${day}/${month}`;
}

const upload = multer({
  storage: memoryStorage(),
  limits: {
    fieldSize: 5 * 1024 * 1024,
    files: 1,
  },
});

// download pdf of participants
eventRouter.get(
  "/:eventId/participants/pdf",
  asyncHandler(async (req, res) => {
    const eventId = String(req.params.eventId || "");

    textRequired(eventId, "Event is required");

    const userId = (req as any).user.id;

    // 1. Get event
    const eventResult = await pool.query(
      `
      SELECT
        id,
        title,
        event_date,
        location,
        is_team_event,
        created_by
      FROM events
      WHERE id = $1
      `,
      [eventId],
    );

    if (eventResult.rows.length === 0) {
      throw new AppError(404, "Event not found");
    }

    const event = eventResult.rows[0];

    // 2. Check event creator
    if (event.created_by !== userId) {
      throw new AppError(
        403,
        "You are not allowed to download these participants",
      );
    }

    let participants = [];
    let teamParticipants = [];

    // Solo event
    if (!event.is_team_event) {
      const participantResult = await pool.query(
        `
        SELECT
          u.full_name,
          u.email,
          u.contact_number,
          u.image_url,
          f.faculty_name AS faculty
        FROM event_registrations er
        INNER JOIN users u
          ON u.id = er.user_id
        LEFT JOIN faculty f
          ON f.id = u.faculty_id
        WHERE er.event_id = $1
        ORDER BY u.full_name
        `,
        [eventId],
      );

      participants = participantResult.rows;
    }

    // team event
    else {
      const teamResult = await pool.query(
        `
        SELECT
          t.id AS team_id,
          t.team_name,
          leader.full_name AS leader_name,

          member.id AS member_id,
          member.full_name,
          member.email,
          member.contact_number,
          member.image_url,
          f.faculty_name AS faculty

        FROM team_registrations tr

        INNER JOIN teams t
          ON t.id = tr.team_id

        INNER JOIN users leader
          ON leader.id = t.leader_id

        INNER JOIN team_members tm
          ON tm.team_id = t.id

        INNER JOIN users member
          ON member.id = tm.user_id

        LEFT JOIN faculty f
          ON f.id = member.faculty_id

        WHERE tr.event_id = $1

        ORDER BY t.team_name, member.full_name
        `,
        [eventId],
      );

      // Convert flat SQL rows into teams
      const teams = new Map();

      for (const row of teamResult.rows) {
        if (!teams.has(row.team_id)) {
          teams.set(row.team_id, {
            leader: row.leader_name,
            teamName: row.team_name,
            member: [],
          });
        }

        teams.get(row.team_id).member.push({
          full_name: row.full_name,
          email: row.email,
          contact_number: row.contact_number,
          image_url: row.image_url,
          faculty: row.faculty,
        });
      }

      teamParticipants = Array.from(teams.values());
    }

    // generate pdf
    const pdf = await generateParticipantPdf(
      {
        title: event.title,
        event_date: event.event_date,
        location: event.location,
        isTeamEvent: event.is_team_event,
      },
      participants,
      teamParticipants,
    );

    // send pdf
    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="participants-${event.title}.pdf"`,
    );

    pdf.pipe(res);
  }),
);

//create and update event
eventRouter.post(
  "/create/event",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;
    const title = String(req.body.title || "").trim();
    const description = String(req.body.description || "").trim();

    const location_id = String(req.body.location_id || "").trim();
    const location_type = String(req.body.location_type).trim();
    let location_name = String(req.body.location_name).trim();

    let event_date = String(req.body.event_date || "").trim();
    let registration_deadline = String(
      req.body.registration_deadline || "",
    ).trim();
    let end_at = String(req.body.end_at).trim();

    const entry_fee = Number(req.body.entry_fee || 0);
    const contact = Number(req.body.contact);
    const max_participants = Number(req.body.max_participants || 100);
    const isTeamEvent = req.body.isTeamEvent === "true";
    const faculty = JSON.parse(req.body.faculty || "[]");
    const file = req.file as Express.Multer.File;

    textRequired(userId, "You are not authenticated");
    textRequired(title, "event title is reqiured");
    textRequired(description, "event description is reqiured");
    textRequired(event_date, "event event_date is reqiured");
    textRequired(
      registration_deadline,
      "event registration_deadline is reqiured",
    );
    numberRequires(contact, "Contct number is requireed");
    numberRequires(max_participants, "please enter the max participants");

    const today = new Date().toISOString().split("T")[0];

    event_date = event_date.split("T")[0];
    registration_deadline = registration_deadline.split("T")[0];
    end_at = end_at.split("T")[0];

    if (event_date <= today) {
      throw new AppError(400, "Event date must be in the future.");
    }

    if (registration_deadline <= today) {
      throw new AppError(400, `Registration deadline after ${today}.`);
    }

    if (registration_deadline >= event_date) {
      throw new AppError(
        400,
        "Registration deadline must be before the event date.",
      );
    }

    if (end_at < event_date) {
      throw new AppError(
        400,
        "Event end date cannot be before the event start date.",
      );
    }

    if (location_type === "internal") {
      const location = await pool.query(
        ` 
          SELECT name FROM location
          WHERE id = $1
        `,
        [location_id],
      );
      location_name = location.rows[0].name;

      const validLoc = await pool.query(
        `
     SELECT e.id, e.title, e.status, e.event_date, e.end_at
     FROM events e
     WHERE e.location_type = 'internal'
       AND e.location_id = $1
       AND e.status IN ('pending', 'approved')
       AND e.event_date::date <= $3::date
       AND e.end_at::date >= $2::date;
      `,
        [location_id, event_date, end_at],
      );

      if (validLoc.rows.length > 0) {
        const conflictingEvent = validLoc.rows[0];
        const start = formatDate(String(conflictingEvent.event_date));
        const end = formatDate(String(conflictingEvent.end_at));

        throw new AppError(
          409,
          `This location is already booked for "${conflictingEvent.title}" from ${start} to ${end}. Please choose another date or location.`,
        );
      }
    }

    if (!file) throw new AppError(400, "event image is required");
    const imageUpload = await uploadImage(file.buffer, "event_publicId");

    const newlyCreatedEvent = await studentService.createEvent(
      title,
      description,
      location_id,
      event_date,
      end_at,
      registration_deadline,
      entry_fee,
      contact,
      imageUpload.url,
      imageUpload.public_id,
      userId,
      location_type,
      location_name,
      isTeamEvent,
      max_participants,
    );

    if (!newlyCreatedEvent) {
      throw new AppError(400, "failed to create event");
    }

    const values: string[] = [];
    const params: string[] = [];

    faculty.forEach((facultyId: string, index: number) => {
      const offset = index * 2;

      values.push(`($${offset + 1}, $${offset + 2})`);
      params.push(newlyCreatedEvent.rows[0].id, facultyId);
    });

    const query = `
    INSERT INTO event_faculties (event_id, faculty_id)
    VALUES ${values.join(", ")}
`;

    await pool.query(query, params);

    res.json(
      ok({
        message: "new event has been created",
        event: newlyCreatedEvent,
      }),
    );
  }),
);

// cancel event
eventRouter.patch(
  "/event/cancel",
  asyncHandler(async (req, res) => {
    const eventId = String(req.body.eventId || "");

    textRequired(eventId, "Event is required");

    const result = await pool.query(
      `
      UPDATE events
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *;
      `,
      [eventId],
    );

    if (result.rowCount === 0) {
      throw new AppError(404, "You are not registered for this event");
    }

    res.status(200).json({
      success: true,
      message: "You have cancelled your event registration",
      data: result.rows[0],
    });
  }),
);
