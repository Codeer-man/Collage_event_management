import { pool } from "../../config/pool.js";
import { uuid } from "../../types/global.types.js";

export type faculty = {
  id: uuid;
  faculty_name: string;
  user_id: string;
};

export const facultyModel = {
  //create faculty

  async createFaculty(faculty: string) {
    const query = `
    INSERT INTO faculty (faculty_name)
    VALUES ($1)
    RETURNING *;
  `;

    const result = await pool.query(query, [faculty]);
    return result.rows[0] as faculty;
  },

  // find fauclty
  async findFaculty(column: "id" | "faculty_name", faculty: string) {
    const query = `
    SELECT * FROM faculty ${column}
    WHERE ${column} = $1
    `;

    const result = await pool.query(query, [faculty]);

    return result.rows[0] as faculty;
  },

  //get all faculty
  async getAllFaculty() {
    const query = `
    SELECT f.*,u.id, u.full_name, u.image_url,u.contact_number 
    FROM faculty as f 
    LEFT JOIN users as u 
    ON f.user_id = u.id
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  //update faculty
  async updateFacultyName(facultyId: string, facultyName: string) {
    const query = `
    UPDATE faculty 
    SET faculty_name = $1 
    WHERE id = $2;
`;

    const values = [facultyName, facultyId];
    await pool.query(query, values);
  },

  // asign faculty admin
  async asignFacultyAdmin(userId: string, facultyId: string) {
    const userQuery = `
      UPDATE users
      SET role = 'admin',
          faculty_id = $1
      WHERE id = $2
      RETURNING id,full_name,image_url;
    `;
    const userData = await pool.query(userQuery, [facultyId, userId]);

    const facultyQuery = `
      UPDATE faculty
      SET user_id = $1
      WHERE id = $2
      RETURNING id,faculty_name,user_id;
    `;

    const facultyData = await pool.query(facultyQuery, [userId, facultyId]);
    return { user: userData.rows[0], faculty: facultyData.rows[0] };
  },
};
