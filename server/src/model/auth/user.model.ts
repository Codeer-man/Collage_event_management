import { pool } from "../../config/pool.js";
import { User } from "../../types/auth.types.js";
import { uuid } from "../../types/global.types.js";

export type createUser = Omit<User, "id">;

interface createuserRes {
  id: uuid;
  is_email_verified: boolean;
  email: string;
}

export const UserModel = {
  //find user by filed

  async findByField(column: "id" | "email", value: string) {
    const query = `SELECT * FROM users WHERE ${column} = $1`;
    const result = await pool.query(query, [value]);
    return result.rows[0] as User;
  },

  //create user

  async create(body: createUser) {
    //seprate the key and value from the object
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

    return result.rows[0] as createuserRes;
  },

  //verify the email

  async emailVerified(id: string) {
    const query = `
      UPDATE users
      SET is_email_verified = true
      WHERE id = $1
      RETURNING *
    `;

    const data = await pool.query<User>(query, [id]);
    return data.rows[0];
  },
};
