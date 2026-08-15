import { pool } from "../../config/pool.js";

export const adminModel = {
  async findNotApprovedSts(facultyId: string) {
    const query = `
        SELECT * FROM users
        WHERE 
            faculty_id = $1 AND
            is_approved_student = false AND
            role = 'student'
        LIMIT 20;
        `;
    const result = await pool.query(query, [facultyId]);
    return result.rows;
  },

  async approveSts(studentId: string, approve: boolean) {
    const query = approve
      ? `
      UPDATE users
      SET is_approved_student = true
      WHERE id = $1
      RETURNING id,full_name;
    `
      : `
      DELETE FROM users
      WHERE id = $1
      RETURNING id,full_name;
    `;

    const result = await pool.query(query, [studentId]);

    return {
      success: result.rows[0],
      action: approve ? "approved" : "deleted",
    };
  },
};
