import { pool } from "../../config/pool.js";

export const EventModel = {
  // get all event of a student
  async getEvents(facultyId: string) {
    const query = `
        SELECT e.image_url ,e.id, e.title, e.description,
        e.location,e.event_date,e.is_team_event , e.status
        FROM events e
        JOIN event_faculties ef
          on e.id = ef.event_id
        WHERE ef.faculty_id = $1
          
        ORDER BY e.created_at ASC
        `;

    const result = await pool.query(query, [facultyId]);
    return result.rows;
  },

  //get single event detial
  async getSingleEvent() {
    const query = `
        SELECT e.*
        FROM event e
        JOIN event_faculties ef
          on e.id = ef.event_id
        WHERE ef.faculty_id = $1 
        `;

    const result = await pool.query(query, []);
    return result.rows[0];
  },
};
