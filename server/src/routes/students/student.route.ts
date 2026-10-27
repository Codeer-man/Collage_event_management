import express from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { numberRequires, textRequired } from "../../utils/helper.js";
import { ok } from "../../utils/envolve.js";
import { studentService } from "../../service/student.service.js";
import { AppError } from "../../utils/AppError.js";
import { UserEventModel } from "../../model/events/user-event.model.js";
import { pool } from "../../config/pool.js";
import { fail } from "node:assert";
import { leaderRoute } from "./leader.route.js";
import { memberRouter } from "./member.route.js";
import { eventRouter } from "./event.route.js";
export const userRoute = express.Router();

userRoute.use(requireAuth);
userRoute.use(leaderRoute);
userRoute.use(memberRouter);
userRoute.use(eventRouter);

// get events
userRoute.get(
  "/events",
  asyncHandler(async (req, res) => {
    const facultyId = (req as any).user.faculty;

    textRequired(facultyId, "Faculty id is reqiured");

    const events = await studentService.getAllEvents(facultyId);

    res.json(
      ok({
        events,
      }),
    );
  }),
);

// get all your events
userRoute.get(
  "/my/event",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;

    const events = await pool.query(
      `
      SELECT * FROM events e
      WHERE e.created_by = $1
    `,
      [userId],
    );

    res.json(
      ok({
        myEvent: events.rows,
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

    const checkExistence = await pool.query(
      `
      SELECT EXISTS(
        SELECT 1 FROM event_registrations
          WHERE event_id = $1 AND user_id = $2
      )
      `,
      [eventId, userId],
    );
    const rowExists = checkExistence.rows[0].exists;

    if (rowExists) {
      throw new AppError(409, "You have already registered for this event");
    }

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

//show sole events where the user is participated
userRoute.get(
  "/event/registered/solo",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;

    const events = await pool.query(
      `
      SELECT e.*
      FROM event_registrations er
      RIGHT JOIN events e
        ON e.id = er.event_id
      WHERE er.user_id = $1;
      `,
      [userId],
    );

    res.json(
      ok({
        events: events.rows,
      }),
    );
  }),
);

// cancel event
userRoute.patch(
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

//event location
userRoute.get(
  "/location",
  asyncHandler(async (req, res) => {
    const location = await pool.query(`
    SELECT * FROM location
    WHERE is_available = true
    `);

    res.json(
      ok({
        location: location.rows,
      }),
    );
  }),
);

//show team events where is the user is participated
userRoute.get(
  "/event/registered/team",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;

    const events = await pool.query(
      `
    SELECT
      e.*,
      t.team_name,t.id AS team_id
      FROM team_registrations tr
      JOIN teams t
        ON t.id = tr.team_id
      JOIN events e
        ON e.id = tr.event_id
      WHERE t.leader_id = $1
        OR EXISTS (
          SELECT 1 FROM team_members tm
            WHERE tm.team_id = t.id
              AND tm.user_id = $1
  );
      `,
      [userId],
    );

    res.json(
      ok({
        events: events.rows,
      }),
    );
  }),
);
