import { pool } from "../../config/pool.js";

export const EventModel = {
  // get all event of a student
  async getEvents(facultyId: string) {
    const query = `
        SELECT e.image_url ,e.title,e.contact
        FROM event e
        JOIN event_faculties ef
          on e.id = ef.event_id
        WHERE ef.faculty_id = $1
          AND e.status <> "rejected"
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
