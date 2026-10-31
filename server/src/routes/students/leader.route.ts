import express from "express";
import { pool } from "../../config/pool.js";
import { AppError } from "../../utils/AppError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { fail, ok } from "../../utils/envolve.js";
import { numberRequires, textRequired } from "../../utils/helper.js";
import { createNotification } from "../../service/notification.service.js";

export const leaderRoute = express.Router();

//get your teams
leaderRoute.get(
  "/your/team",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;

    textRequired(userId, "You are not authenticated");

    const leader = await pool.query(
      `
      SELECT t.*,
        e.title,e.image_url,e.max_participants,
        e.location_name,e.event_date
      FROM teams t
      JOIN events e
        ON e.id = t.event_id
      WHERE t.leader_id = $1
      ORDER BY t.created_at DESC
      `,
      [userId],
    );

    if (leader.rows.length === 0) {
      res.json(
        ok({
          message: "You are not the leader of any team",
        }),
      );
      return;
    }

    const teams = await Promise.all(
      leader.rows.map(async (team) => {
        const members = await pool.query(
          `
          SELECT
            tm.id,
            tm.user_id,
            tm.joined_at,
            u.full_name,
            u.image_url,
            u.email,
            u.contact_number
          FROM team_members tm
          JOIN users u
            ON tm.user_id = u.id
          WHERE tm.team_id = $1
          ORDER BY tm.joined_at ASC
          `,
          [team.id],
        );

        return {
          ...team,
          members: members.rows,
        };
      }),
    );

    res.json(
      ok({
        teams,
      }),
    );
  }),
);

// create your team for a event
leaderRoute.post(
  "/create",
  asyncHandler(async (req, res) => {
    const team_name = String(req.body.teamName).trim();
    const userId = (req as any).user.id;
    const eventId = Number(req.body.eventId);

    textRequired(team_name, "Team name is requierd");
    textRequired(userId, "User id is requierd");

    // check if the event exists and is team event
    const findEvent = await pool.query(
      `
        SELECT id FROM events
        WHERE id = $1
        AND is_team_event = true;
  `,
      [eventId],
    );

    if (findEvent.rows.length === 0) {
      throw new AppError(404, "Team event does not exist");
    }

    // check if the student is already in a team
    const validateSts = await pool.query(
      `
        SELECT EXISTS(
            SELECT 1 FROM teams
                WHERE event_id = $1 
                AND leader_id = $2
            UNION ALL

            SELECT 1 FROM team_members tm
            JOIN teams t 
                ON t.id = tm.team_id
            WHERE t.event_id = $1
                AND tm.user_id = $2             
        ) AS is_in_team
        
        `,
      [eventId, userId],
    );

    if (validateSts.rows[0].is_in_team) {
      throw new AppError(409, "You are already in a team in this event");
    }

    //create team
    const createTeam = await pool.query(
      `
      INSERT INTO teams (event_id, team_name, leader_id)
      VALUES ($1, $2, $3)
      RETURNING *;
  `,
      [eventId, team_name, userId],
    );

    const teamId = createTeam.rows[0].id;

    // insert the user in the team
    await pool.query(
      `
      INSERT INTO team_members (team_id, user_id)
      VALUES ($1, $2)
      RETURNING *;
  `,
      [teamId, userId],
    );

    // insert into team_registration
    await pool.query(
      `
            INSERT INTO team_registrations (event_id,team_id)
            VALUES ($1,$2)
        `,
      [eventId, teamId],
    );

    res.json(
      ok({
        Team: createTeam.rows[0],
      }),
    );
  }),
);

// find students for event
leaderRoute.get(
  "/sts/:fullName",
  asyncHandler(async (req, res) => {
    const fullName = String(req.params.fullName).trim();

    textRequired(fullName, "User name is required");

    const users = await pool.query(
      `
      SELECT 
        u.id,
        u.full_name,
        u.image_url,
        f.faculty_name
      FROM users u
      JOIN faculty f ON f.id = u.faculty_id
        WHERE u.full_name ILIKE $1
    `,
      [`%${fullName}%`],
    );

    if (!users.rows) {
      throw new AppError(400, `No user found with the name ${fullName}`);
    }

    res.json(
      ok({
        users: users.rows,
      }),
    );
  }),
);

//  send invitaion to join the team
leaderRoute.post(
  "/add/member",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;

    const member_id = String(req.body.member_id || "").trim();
    const teamId = Number(req.body.teamId);
    const eventId = Number(req.body.eventId);

    // leader check
    const eligibleLeader = await pool.query(
      `
     SELECT t.team_name,u.full_name AS name, e.title as event_title
      FROM teams t
      JOIN users u
        ON u.id = $3
      JOIN events e
        ON e.id = t.event_id
      WHERE t.id = $1
        AND t.event_id = $2
        AND t.leader_id = $3;
      
      `,
      [teamId, eventId, userId],
    );

    if (!eligibleLeader.rowCount) {
      throw new AppError(409, "Only leader are allowed to send invitatino");
    }

    // check student faculty eligible
    const eligibleSts = await pool.query(
      `
      SELECT EXISTS (
        SELECT 1
          FROM users u
        JOIN event_faculties ef
          ON ef.faculty_id = u.faculty_id
        WHERE u.id = $1
          AND ef.event_id = $2
          AND u.role = 'student'
      ) AS is_eligible;
      `,
      [member_id, eventId],
    );

    if (!eligibleSts.rows[0].is_eligible) {
      throw new AppError(403, "Student is not eligible for this event");
    }

    // check if the student is already in a team
    const validateSts = await pool.query(
      `
        SELECT EXISTS(
            SELECT 1 FROM teams
                WHERE event_id = $1 
                AND leader_id = $2

            UNION ALL

            SELECT 1 FROM team_members tm
            JOIN teams t 
                ON t.id = tm.team_id
            WHERE t.event_id = $1
                AND tm.user_id = $2             
        ) AS is_in_team
        `,
      [eventId, member_id],
    );

    if (validateSts.rows[0].is_in_team) {
      throw new AppError(409, "user already in a team in this event");
    }

    // duplicate pending check
    const cloneInviteCheck = await pool.query(
      `
      SELECT EXISTS (
        SELECT 1
          FROM team_invitations
        WHERE team_id = $1
          AND invited_user_id = $2
          AND status = 'pending'
      ) AS has_pending_invitation;
      `,
      [teamId, member_id],
    );

    if (cloneInviteCheck.rows[0].has_pending_invitation) {
      throw new AppError(
        409,
        "You have already invited the user. Wait for the response",
      );
    }

    // send invitation
    const invition = await pool.query(
      `
       INSERT INTO team_invitations
        (team_id, invited_user_id, invited_by)
        VALUES ($1, $2, $3)
        RETURNING id;
      `,
      [teamId, member_id, userId],
    );

    //notification
    await createNotification({
      userId: member_id,
      title: "Team Invitation",
      message: `${eligibleLeader.rows[0].name} has invited you to join the team 
      "${eligibleLeader.rows[0].team_name}". Join the team to participate 
      together in the ${eligibleLeader.rows[0].event_title} event. Check your team invitations to accept or decline the request.`,
      entityId: String(invition.rows[0].id),
      entityType: "notificatin",
      type: "team_invitation",
    });
    res.json(ok({ message: "Invitation has been sent" }));
  }),
);

// remove member from the team
leaderRoute.delete(
  "/remove/member",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;

    const member_id = String(req.body.member_id || "").trim();
    const teamId = Number(req.body.teamId);
    const eventId = Number(req.body.eventId);
    // leader check
    const eligibleLeader = await pool.query(
      `
     SELECT 1
      FROM teams
      WHERE id = $1
        AND event_id = $2
        AND leader_id = $3;
      `,
      [teamId, eventId, userId],
    );

    if (!eligibleLeader.rowCount) {
      throw new AppError(409, "Only leader is allowed to remove the member");
    }

    await pool.query(
      `
        DELETE FROM team_members
          WHERE team_id = $1 AND 
          user_id = $2

      `,
      [teamId, member_id],
    );

    await createNotification({
      message:
        "Sorry due to some team management error you have been layed off",
      title: "Ejected from team",
      type: "team_invitation_response",
      userId: member_id,
    });

    res.json(ok({ success: true }));
  }),
);

// show participates
leaderRoute.get(
  "/event/participate/:eventId",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;
    const eventId = Number(req.params.eventId);
    numberRequires(eventId, "Event id  not found");

    const existingEvent = await pool.query(
      `
      SELECT * FROM events e
      WHERE e.id = $1
      `,
      [eventId],
    );

    if (existingEvent.rows.length === 0) {
      res.json(fail("event not found"));
    }

    if (existingEvent.rows[0].created_by !== userId) {
      res.status(409).json({ message: "You are not the owner of this event " });
      return;
    }

    //participants
    const teamParticipants = await pool.query(
      `
      SELECT
        e.id AS event_id,
        e.title AS event_title,

        tr.id AS registration_id,

        t.id AS team_id,
        t.team_name,

        json_agg(
          json_build_object(
            'user_id', u.id,
            'name', u.full_name,
            'image', u.image_url
          )
        ) AS members

        FROM team_registrations tr

        INNER JOIN events e
          ON e.id = tr.event_id

        INNER JOIN teams t
          ON t.id = tr.team_id

        INNER JOIN team_members tm
          ON tm.team_id = t.id

        INNER JOIN users u
          ON u.id = tm.user_id

        WHERE e.id = $1

        GROUP BY
          e.id,
          e.title,
          tr.id,
          t.id,
          t.team_name;
  `,
      [eventId],
    );

    const soloParticipants = await pool.query(
      `
      SELECT
        er.*,u.full_name AS name,
        u.image_url AS image
      FROM event_registrations er
      INNER JOIN users u
        ON u.id = er.user_id
      WHERE er.id = $1;
      `,
      [eventId],
    );

    res.json(ok({ team: teamParticipants.rows, solo: soloParticipants.rows }));
  }),
);
