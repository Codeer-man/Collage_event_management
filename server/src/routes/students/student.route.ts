import express from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { numberRequires, textRequired } from "../../utils/helper.js";
import { ok } from "../../utils/envolve.js";
import { studentService } from "../../service/student.service.js";
import { AppError } from "../../utils/AppError.js";
import { UserEventModel } from "../../model/events/user-event.model.js";
import { pool } from "../../config/pool.js";
import { leaderRoute } from "./leader.route.js";
import { memberRouter } from "./member.route.js";
import { eventRouter } from "./event.route.js";
import { createNotification } from "../../service/notification.service.js";
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

// team invition decision
userRoute.patch(
  "/team/:decision",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;
    const name = (req as any).user.full_name;

    const invitationId = Number(req.body.entityId);
    const decision = String(req.params.decision || "").trim();

    if (!["accept", "reject"].includes(decision)) {
      throw new AppError(400, "Invalid decision");
    }

    // Find invitation
    const invitation = await pool.query(
      `
        SELECT status, team_id, invited_user_id,invited_by
        FROM team_invitations
        WHERE id = $1
      `,
      [invitationId],
    );

    if (invitation.rows.length === 0) {
      throw new AppError(404, "You were not invited to this team");
    }

    const invitationData = invitation.rows[0];

    if (invitationData.invited_user_id !== userId) {
      throw new AppError(403, "This invitation does not belong to you");
    }

    if (invitationData.status !== "pending") {
      throw new AppError(409, "This invitation has already been handled");
    }

    const presentDate = new Date();

    // Reject invitation
    if (decision === "reject") {
      await pool.query(
        `UPDATE team_invitations
        SET status = 'rejected',
          responded_at = $2
        WHERE id = $1`,
        [invitationId, presentDate],
      );

      await createNotification({
        userId: invitationData.invited_by,
        title: "Invition rejected",
        message: `${name} has rejected your team invition`,
        type: "team_invitation_response",
      });

      res.json(ok({ message: "Invition rejected" }));
      return;
    }

    // Find team and event participant limit
    const team = await pool.query(
      `
        SELECT t.id,t.team_name, e.max_participants,t.leader_id
        FROM teams t
        JOIN events e ON e.id = t.event_id
        WHERE t.id = $1
      `,
      [invitationData.team_id],
    );

    if (team.rows.length === 0) {
      throw new AppError(404, "Team not found");
    }

    // Count current team members
    const teamMembers = await pool.query(
      `
        SELECT COUNT(*)::int AS total
        FROM team_members
        WHERE team_id = $1
      `,
      [invitationData.team_id],
    );

    const totalMembers = teamMembers.rows[0].total;

    if (totalMembers >= team.rows[0].max_participants) {
      await pool.query(
        `UPDATE team_invitations
        SET status = 'rejected',
          responded_at = $2
        WHERE id = $1`,
        [invitationId, presentDate],
      );
      throw new AppError(409, "This team has reached its maximum capacity");
    }

    // Add member and accept invitation
    await pool.query(
      `
        INSERT INTO team_members (team_id, user_id)
        VALUES ($1, $2)
      `,
      [invitationData.team_id, userId],
    );

    await pool.query(
      `UPDATE team_invitations
        SET status = 'accepted',
          responded_at = $2
        WHERE id = $1`,
      [invitationId, presentDate],
    );

    // send notification
    await createNotification({
      userId: invitationData.invited_by,
      title: "Invition accepted",
      message: `${name} has accepted your ${team.rows[0].team_name} team invition`,
      type: "team_invitation_response",
    });

    res.json(ok({ message: "Invition Accepted" }));
  }),
);
