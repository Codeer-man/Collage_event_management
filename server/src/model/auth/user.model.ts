import { pool } from "../../config/pool.js";
import { User } from "../../types/auth/auth.types.js";
import { uuid } from "../../types/global.types.js";

export type createUser = Omit<User, "id">;

interface createuserRes {
  id: uuid;
  is_email_verified: boolean;
  email: string;
}

// Helper array to strictly whitelist acceptable column names for findByField
const ALLOWED_COLUMNS = ["id", "email"] as const;

export const UserModel = {
  /**
   * Find user by a specific column.
   */
  async findByField(column: "id" | "email", value: string) {
    if (!ALLOWED_COLUMNS.includes(column)) {
      throw new Error(`Invalid column query attempt: ${column}`);
    }

    const query = `SELECT * FROM users WHERE ${column} = $1`;
    const result = await pool.query(query, [value]);
    return result.rows[0] as User;
  },

  /**
   * Create user dynamically securely.
   */

  async create(body: createUser) {
    //seprate the key and value from the object
    const keys = Object.keys(body);
    const values = Object.values(body);

    const columns = keys
      .map((key) => `"${key.replace(/"/g, '""')}"`)
      .join(", ");
    const placeholder = values.map((_, i) => `$${i + 1}`).join(", ");

    const query = `
        INSERT INTO users (${columns})
        VALUES (${placeholder})
        RETURNING id, is_email_verified, email
    `;
    const result = await pool.query<User>(query, values);

    return result.rows[0] as createuserRes;
  },

  /**
   * Verify the email.
   */

  async emailVerified(id: string) {
    const query = `
      UPDATE users
      SET is_email_verified = true
      WHERE id = $1
      RETURNING *
    `;

    const data = await pool.query<User>(query, [id]);
    return data.rows[0] || null;
  },

  //get user for admin role
  async adminUser(facultyId: string, search: string) {
    const query = `
    SELECT id,full_name,email,image_url
    FROM users
    WHERE faculty_id = $1

    AND (
        $2 = ''
        OR full_name ILIKE '%' || $2 || '%'
        OR email ILIKE '%' || $2 || '%'
      )
    LIMIT 10;
    `;

    const data = await pool.query(query, [facultyId, search]);
    return data.rows;
  },
};
// AND role <> 'admin'
