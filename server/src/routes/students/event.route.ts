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
