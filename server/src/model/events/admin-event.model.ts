import { pool } from "../../config/pool.js";

export const AdminEventModel = {
  async getEvents(facultyId: string) {
    const query = `
        SELECT e.image_url ,e.title,e.contact
        FROM event e
        JOIN event_faculties ef
          on e.id = ef.event_id
        WHERE ef.faculty_id = $1
          AND e.status = "pending"
        `;

    const result = await pool.query(query, [facultyId]);
    return result.rows;
  },

  //approve event
  async approveEvent(eventId: string, approve: boolean) {
    const status = approve ? "approveed" : "rejected";

    const query = `
            UPDATE events 
            SET status = &1
            WHERE id = $2
            RETURNING *
        `;

    const resutt = await pool.query(query, [status, eventId]);
    return resutt.rows[0];
  },
};
