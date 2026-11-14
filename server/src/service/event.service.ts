import { pool } from "../config/pool.js";
import { AppError } from "../utils/AppError.js";

type eventDetailRes = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  event_date: Date;
  location_name: string;
  entry_fee: number;
  status: string;
  is_team_event: boolean;
  created_at: Date;
  max_participants: number;
  registration_deadline: Date;
  total_teams?: number;
  total_team_members?: number;
  total_solo_participants?: number;
};

// event detail,team & member count of solo and team event

export async function eventDetail(eventId: number, userId: string) {
  const event = await pool.query<eventDetailRes>(
    `
      SELECT
        e.id,e.title,e.description,e.image_url,e.event_date,e.location_name,e.entry_fee,
        e.status,e.is_team_event,e.created_at,e.registration_deadline,e.max_participants,

    -- team events
      CASE WHEN e.is_team_event THEN
        (SELECT COUNT(*)::int FROM teams t WHERE t.event_id = e.id)
      ELSE 0 END AS total_teams,

      CASE WHEN e.is_team_event THEN
        (SELECT COUNT(*)::int
        FROM team_members tm
        JOIN teams t ON t.id = tm.team_id
        WHERE t.event_id = e.id)
      ELSE 0 END AS total_team_members,

      -- solo events
      CASE WHEN NOT e.is_team_event THEN
        (SELECT COUNT(*)::int FROM event_registrations er WHERE er.event_id = e.id)
      ELSE 0 END AS total_solo_participants

      FROM events e
      WHERE e.id = $1
        AND e.created_by = $2
    `,
    [eventId, userId],
  );

  return event.rows[0];
}

// event participants list
export async function eventParticipants(eventId: number, userId: string) {
  const findEvent = await pool.query(
    ` 
      SELECT is_team_event FROM events 
      WHERE id = $1
      `,
    [eventId],
  );

  if (findEvent.rowCount === 0) {
    throw new AppError(404, "Event not found");
  }

  const event = findEvent.rows[0];
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
  return {
    participants,
    teamParticipants,
    teamEvent: event.is_team_event,
  };
}
