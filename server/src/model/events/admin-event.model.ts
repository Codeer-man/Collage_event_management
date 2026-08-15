import { pool } from "../../config/pool.js";

export const AdminEventModel = {
  async getEvents(facultyId: string) {
    const query = `
       SELECT
    e.id,
    e.title,
    e.description,
    e.location,
    e.event_date,
    e.registration_deadline,
    e.entry_fee,
    e.contact,
    e.image_url,
    e.created_by,
    e.status,
    e.is_team_event,
    e.max_participants,

    u.full_name AS organizer_name,
    u.image_url AS pp

    FROM events e
    JOIN users u
        ON u.id = e.created_by
    WHERE u.faculty_id = $1
      AND e.status = 'pending';
        `;

    const result = await pool.query(query, [facultyId]);
    return result.rows;
  },

  //approve event
  async approveEvent(eventId: string, approve: boolean) {
    const status = approve ? "approved" : "rejected";

    const query = `
            UPDATE events 
            SET status = $1
            WHERE id = $2
            RETURNING *
        `;

    const resutt = await pool.query(query, [status, eventId]);
    return resutt.rows[0];
  },
};
