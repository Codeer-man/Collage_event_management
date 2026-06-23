import { pool } from "../config/pool.js";

interface createUser {
  full_name: string;
  email: string;
  password: string;
  faculty_id: string;
  contact_number: string;
  image_url: string;
  public_id: string;
  role: "student" | "admin";
  is_email_verified: boolean;
}

interface User {
  id: string;
  isEmailVerified: string;
  email: string;
}

export const UserModel = {
  async findByField(column: "id" | "email", value: string) {
    const query = `SELECT * FROM users WHERE ${column} = $1`;
    const result = await pool.query(query, [value]);
    return result.rows[0];
  },

  async create(body: createUser) {
    const keys = Object.keys(body);
    const values = Object.values(body);

    const columns = keys.map((key) => `"${key}"`).join(", ");
    const placeholder = values.map((_, i) => `$${i + 1}`).join(", ");

    const query = `
        INSERT INTO users (${columns})
        VALUES (${placeholder})
        RETURNING id, is_email_verified, email
    `;
    const result = await pool.query<User>(query, values);

    return result.rows[0];
  },

  async emailVerified(id: string) {
    const query = `
      UPDATE users
      SET is_email_verified = true
      WHERE id = $1
      RETURNING *
    `;

    return await pool.query(query, [id]);
  },
};
