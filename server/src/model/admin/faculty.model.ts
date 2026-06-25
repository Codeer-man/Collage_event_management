import { pool } from "../../config/pool.js";

export const facultyModel = {
  async createFaculty(faculty: string, createdBy: string) {
    const query = `
    INSERT INTO faculty (faculty_name, created_by)
    VALUES ($1, $2)
    RETURNING *;
  `;

    const result = await pool.query(query, [faculty, createdBy]);
    return result.rows[0];
  },

  async findFaculty(column: "id" | "faculty_name", faculty: string) {
    const query = `
    SELECT * FROM faculty ${column}
    WHERE ${column} = $1
    `;

    const result = await pool.query(query, [faculty]);

    return result.rows[0];
  },

  async getAllFaculty() {
    const query = `
    SELECT * FROM faculty
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  async updateFacultyName(facultyId: string, facultyName: string) {
    const query = `
    UPDATE faculty 
    SET faculty_name = $1 
    WHERE id = $2;
`;

    const values = [facultyName, facultyId];
    await pool.query(query, values);
  },
};
