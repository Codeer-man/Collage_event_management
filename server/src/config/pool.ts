import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export async function testToConnect(): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query("SELECT 1");
    console.log("Connected to postgress db");
  } finally {
    client.release();
  }
}

// online database
// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL!,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
