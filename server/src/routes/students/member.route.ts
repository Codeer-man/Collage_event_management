import router from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { textRequired } from "../../utils/helper.js";
import { pool } from "../../config/pool.js";
import { ok } from "../../utils/envolve.js";
import { AppError } from "../../utils/AppError.js";

export const memberRouter = router();

// get all the team you are in
memberRouter.get(
  "/team",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;

    textRequired(userId, "You are not authenticated");

    const result = await pool.query(
      `
      SELECT
        t.id,
        t.team_name,
        t.event_id,

        e.title AS event_title,
        e.image_url AS event_image,
        e.event_date,

        u.full_name AS leader_name

      FROM teams t

      INNER JOIN team_members tm
        ON t.id = tm.team_id

      INNER JOIN events e
        ON t.event_id = e.id

      INNER JOIN users u
        ON t.leader_id = u.id

      WHERE tm.user_id = $1
  `,
      [userId],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "You are not in any team.",
      });
      return;
    }

    res.json(
      ok({
        success: true,
        leader: false,
        team: result.rows,
      }),
    );
  }),
);

//get team invitation
memberRouter.get(
  "/team/invite",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;

    const invitation = await pool.query(
      `
      SELECT
        ti.id AS invitation_id,
        ti.status,
        ti.created_at,
        t.team_name,
        e.id AS event_id,
        e.title AS event_title,
        e.image_url AS event_image,
        u.full_name AS invited_by_name,
        u.image_url AS invited_by_image
      FROM team_invitations ti
      JOIN teams t ON ti.team_id = t.id
      JOIN events e ON t.event_id = e.id
      JOIN users u ON ti.invited_by = u.id
      WHERE ti.invited_user_id = $1
        AND ti.status = 'pending'
      ORDER BY ti.created_at DESC
      `,
      [userId],
    );

    res.status(200).json({
      data: invitation.rows,
    });
  }),
);

// Accept or decline team invitation
memberRouter.patch(
  "/team/invite",
  asyncHandler(async (req, res) => {
    const userId = (req as any).user.id;
    const { invitationId, decision } = req.body;

    // check the response
    if (!["accepted", "rejected"].includes(decision)) {
      throw new AppError(400, "Invalid invitation decision");
    }

    // find the invitation
    const invitation = await pool.query(
      `
      SELECT
        ti.id,
        ti.team_id,
        ti.status,
        t.event_id,
        e.max_participants
      FROM team_invitations ti
      JOIN teams t ON ti.team_id = t.id
      JOIN events e ON t.event_id = e.id
      WHERE ti.id = $1
        AND ti.invited_user_id = $2
      `,
      [invitationId, userId],
    );

    if (invitation.rowCount === 0) {
      throw new AppError(404, "Invitation not found");
    }

    const invite = invitation.rows[0];

    // if the invitation status is not pending
    if (invite.status !== "pending") {
      throw new AppError(400, "Invitation has already been answered");
    }

    if (decision === "accepted") {
      // Check if student is already participating in this event
      const existingMember = await pool.query(
        `
        SELECT 1
        FROM teams t
        LEFT JOIN team_members tm ON tm.team_id = t.id
        WHERE t.event_id = $1
          AND (t.leader_id = $2 OR tm.user_id = $2)
        `,
        [invite.event_id, userId],
      );

      if (existingMember.rowCount! > 0) {
        throw new AppError(400, "You already belong to a team in this event");
      }

      // Check team member limit (NULL means unlimited)
      if (invite.max_participants !== null) {
        const memberCount = await pool.query(
          `
          SELECT
            (SELECT COUNT(*) FROM team_members 
            WHERE team_id = $1)
            + 1 AS total_members
          FROM teams
          WHERE id = $1
          `,
          [invite.team_id],
        );

        if (
          Number(memberCount.rows[0].total_members) > invite.max_participants
        ) {
          throw new AppError(400, "This team has reached its member limit");
        }
      }

      // invitation accepted
      await pool.query(
        `
        INSERT INTO team_members (team_id, user_id)
        VALUES ($1, $2)
        `,
        [invite.team_id, userId],
      );
    }

    // update inviation table
    await pool.query(
      `
      UPDATE team_invitations
      SET status = $1, responded_at = NOW()
      WHERE id = $2
      `,
      [decision, invitationId],
    );

    res.status(200).json({
      success: true,
      message:
        decision === "accepted"
          ? "Invitation accepted successfully"
          : "Invitation declined successfully",
    });
  }),
);
