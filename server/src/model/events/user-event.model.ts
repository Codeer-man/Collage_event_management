import { pool } from "../../config/pool.js";

export const UserEventModel = {
  // Join solo event
  async joinSingleEvent(eventId: number, userId: string) {
    const query = `
    INSERT INTO event_registrations (event_id, user_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

    const result = await pool.query(query, [eventId, userId]);
    return result.rows[0];
  },
};
