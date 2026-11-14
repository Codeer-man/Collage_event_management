import express from "express";
import { numberRequires } from "../../utils/helper.js";
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

// Edit Event

// Event Updates

// Event News
