import express from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { textRequired } from "../../utils/helper.js";
import { pool } from "../../config/pool.js";
import { AppError } from "../../utils/AppError.js";
import { generateParticipantPdf } from "../../lib/pdf.js";

export const eventRoouter = express.Router();

eventRoouter.use(requireAuth);

eventRoouter.get(
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
