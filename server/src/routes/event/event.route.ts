import express from "express";
import { numberRequires, textRequired } from "../../utils/helper.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { pool } from "../../config/pool.js";
import { ok } from "../../utils/envolve.js";
import * as eventService from "../../service/event.service.js";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { AppError } from "../../utils/AppError.js";

export const eventRouter = express.Router();

eventRouter.use(requireAuth);

async function eventOwner(eventId: number, userId: string) {
  // check user ownership
  const owner = await pool.query(
    `
    SELECT 1 FROM events
    WHERE id = $1 AND created_by = $2
    `,
    [eventId, userId],
  );

  if (owner.rowCount === 0) {
    throw new AppError(401, "You are not the owner of the event");
  }
}

// Overview
// Event Details
eventRouter.get(
  "/:eventId",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;
    const eventId = Number(req.params.eventId || 0);

    // check if the user is owner or creater of the event
    await eventOwner(eventId, userId);

    numberRequires(eventId, "Event id is required");

    //event detail
    const event = await eventService.eventDetail(eventId, userId);

    res.json(ok({ event: event }));
  }),
);

// Participants
eventRouter.get(
  "/:eventId/participants",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;
    const eventId = Number(req.params.eventId || 0);

    // check if the user is owner or creater of the event
    await eventOwner(eventId, userId);

    const participants = await eventService.eventParticipants(eventId, userId);

    if (!participants) {
      throw new AppError(304, "No have joind the event yet");
    }

    res.json(ok({ participants: participants }));
  }),
);

// Event News and update
eventRouter.post(
  "/noti/:eventId",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;
    const msg = String(req.body.msg || "");
    const title = String(req.body.title);
    const eventId = Number(req.params.eventId);

    textRequired(msg, "Message is required");
    textRequired(title, "title is required");

    // check event owner
    await eventOwner(eventId, userId);

    // find event
    const findEvent = await pool.query(
      `
      SELECT id ,is_team_event AS isTeamEvent 
      FROM events where id = $1
      `,
      [eventId],
    );

    if (findEvent.rowCount === 0) {
      throw new AppError(404, "Event not found");
    }
    console.log(findEvent.rows);

    const event = findEvent.rows[0];
    let participants = [];
    // find participants
    if (event.isteamevent) {
      const team = await pool.query(
        `
      SELECT DISTINCT tm.user_id AS user
      FROM team_registrations tr
      JOIN team_members tm
        ON tm.team_id = tr.team_id
      WHERE tr.event_id = $1;
      `,
        [event.id],
      );

      participants = team.rows;
    } else {
      const team = await pool.query(
        `
        SELECT user_id as user
        FROM event_registrations
        WHERE event_id = $1
        `,
        [event.id],
      );
      participants = team.rows;
    }
    console.log(participants);

    const userIds = participants.map((p) => p.user);

    //  insert bulk in a db
    const result = await pool.query(
      `
      INSERT INTO notification (
        user_id,
        title,
        message,
        type
      )
      SELECT
        u.user_id,
        $2,
        $3,
        'event_news'
      FROM UNNEST($1::uuid[]) AS u(user_id)
  `,
      [userIds, title, msg],
    );

    console.log("Inserted rows:", result.rowCount);
    res.json(
      ok({
        message: "Message has been successfully send to all the participants",
      }),
    );
  }),
);
