import express from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { numberRequires, textRequired } from "../../utils/helper.js";
import { ok } from "../../utils/envolve.js";
import { studentService } from "../../service/student.service.js";
import { AppError } from "../../utils/AppError.js";
import { UserModel } from "../../model/auth/user.model.js";
import { UserEventModel } from "../../model/events/user-event.model.js";
import { pool } from "../../config/pool.js";
import multer, { memoryStorage } from "multer";
import { uploadImage } from "../../utils/cloudinary.js";
export const userRoute = express.Router();

const upload = multer({
  storage: memoryStorage(),
  limits: {
    fieldSize: 5 * 1024 * 1024,
    files: 1,
  },
});

userRoute.use(requireAuth);

// get events
userRoute.get(
  "/events",
  asyncHandler(async (req, res) => {
    const facultyId = (req as any).user.facultyId;

    textRequired(facultyId, "Faculty id is reqiured");

    const events = await studentService.getAllEvents(facultyId);

    res.json(
      ok({
        events,
      }),
    );
  }),
);

//create and update event
userRoute.post(
  "/create/event",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;
    const title = String(req.body.title || "").trim();
    const description = String(req.body.description || "").trim();
    const location = String(req.body.location || "").trim();
    const event_date = String(req.body.event_date || "").trim();
    const registration_deadline = String(
      req.body.registration_deadline || "",
    ).trim();
    const entry_fee = Number(req.body.entry_fee || 0);
    const contact = Number(req.body.contact);
    const max_participants = Number(req.body.max_participants || 100);
    const isTeamEvent = Boolean(req.body.isTeamEvent || false);
    const eventId = String(req.body.eventId || "").trim();
    const file = req.file as Express.Multer.File;

    textRequired(userId, "You are not authenticated");
    textRequired(title, "event title is reqiured");
    textRequired(description, "event description is reqiured");
    textRequired(location, "event location is reqiured");
    textRequired(event_date, "event event_date is reqiured");
    textRequired(
      registration_deadline,
      "event registration_deadline is reqiured",
    );
    numberRequires(contact, "Contct number is requireed");

    const today = new Date().toISOString().split("T")[0];

    if (event_date <= today || registration_deadline <= today) {
      throw new AppError(
        400,
        "Date must be in the future (cannot be today or a past date).",
      );
    }

    if (!file) throw new AppError(400, "event image is required");
    const imageUpload = await uploadImage(file.buffer, "event_publicId");

    const newlyCreatedEvent = await studentService.saveEvent(
      title,
      description,
      location,
      event_date,
      registration_deadline,
      entry_fee,
      contact,
      imageUpload.url,
      imageUpload.public_id,
      userId,
      isTeamEvent,
      max_participants,
      eventId,
    );

    if (!newlyCreatedEvent) {
      throw new AppError(400, "failed to create event");
    }

    res.json(
      ok({
        message: "new event has been created",
        event: newlyCreatedEvent,
      }),
    );
  }),
);

//cancel event
userRoute.patch(
  "/event/cancel/:eventId",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;
    const eventId = String(req.params.eventId);
    textRequired(userId, "User id is required");
    textRequired(eventId, "event id is required");

    const cancelEvent = await pool.query(
      `
      UPDATE events
      SET status = $1
      WHERE id = $2 AND created_by = $3
    `,
      ["cancelled", eventId, userId],
    );

    if (cancelEvent.rowCount === 0) {
      throw new AppError(404, "Event not found ");
    }

    res.json(
      ok({
        message: "Event successfully cancelled",
      }),
    );
  }),
);

// join single events events
userRoute.post(
  "/event/single",
  asyncHandler(async (req, res) => {
    const user = (req as any).user;
    const eventId = Number(req.body.eventId);
    const userId = user.id;
    numberRequires(400, "EventId is requierd");
    textRequired(404, "user id not found");

    const joinEvent = UserEventModel.joinSingleEvent(eventId, userId);

    if (!joinEvent) {
      throw new AppError(500, "event join failed");
    }

    res.json(
      ok({
        status: "success",
        joinEvent,
      }),
    );
  }),
);

// create team
userRoute.post(
  "/create/:eventId",
  asyncHandler(async (req, res) => {
    const teamName = String(req.body.teamName || "").trim();
    const userId = (req as any).user.id;
    const eventId = Number(req.params.eventId);
    textRequired(teamName, "Team name is requierd");
    textRequired(userId, "User id is requierd");

    const createTeam = await pool.query(
      `
      INSERT INTO teams (event_id, team_name, leader_id)
      VALUES ($1, $2, $3)
      RETURNING *;
  `,
      [eventId, teamName, userId],
    );

    res.json(
      ok({
        Team: createTeam.rows[0],
      }),
    );
  }),
);

//  add or remove  member by email
userRoute.post(
  "/event/:teamId",
  asyncHandler(async (req, res) => {
    const email = String(req.body.email || "").trim();
    const userId = String(req.body.userId || "").trim();
    const teamId = +req.params.teamId;
    const eventId = Number(req.body.eventId);

    numberRequires(teamId, "team is requierd");
    numberRequires(eventId, "Event id not found");

    //Adding a member via email
    if (userId === "") {
      textRequired(email, "email is required");

      const findUser = await UserModel.findByField("email", email);

      if (!findUser) {
        throw new AppError(404, "User not found with the email");
      }

      const checkFaculty = await pool.query(
        `
        SELECT EXISTS (
          SELECT 1 FROM event_faculties
          WHERE event_id = $1 AND faculty_id = $2
        ) AS "isValid";
        `,
        [eventId, findUser.faculty_id],
      );

      const isValid = checkFaculty.rows[0].isValid;

      if (!isValid) {
        throw new AppError(
          400,
          "This student is not part of an accepted faculty for this event.",
        );
      }

      const addToTeam = await pool.query(
        `
        INSERT INTO team_members (team_id, user_id)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [teamId, findUser.id],
      );

      res.json(
        ok({
          message: `${findUser.full_name} added to the team successfully.`,
        }),
      );
    }

    //  Removing a member via userId
    else if (email === "") {
      textRequired(userId, "userId is required");

      await pool.query(
        `
        DELETE FROM team_members
        WHERE user_id = $1 AND team_id = $2;
        `,
        [userId, teamId], // Safe deletion target scoped to this specific team
      );

      res.json(
        ok({
          message: "User removed",
        }),
      );
    }
  }),
);

//join team event
userRoute.post(
  "/event/team",
  asyncHandler(async (req, res) => {
    const teamId = Number(req.body.teamId);
    const eventId = Number(req.body.eventId);

    numberRequires(400, "EventId is requierd");
    numberRequires(teamId, "team is required");

    const registerTeam = await pool.query(
      `
      INSERT INTO team_registrations (event_id,team_id)
      VALUES ($1,$2)
      RETURNING *
      `,
      [eventId, teamId],
    );

    res.json(
      ok({
        event: "Successfully jpind the event",
      }),
    );
  }),
);
