import { pool } from "../config/pool.js";

afterEach(async () => {
  // Add all your primary table names here.
  // CASCADE automatically clears linked foreign key data.
  // RESTART IDENTITY resets auto-incrementing IDs back to 1.
  await pool.query(`
    TRUNCATE TABLE 
      users
  `);
});

afterAll(async () => {
  await pool.end();
});
