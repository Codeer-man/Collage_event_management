import request from "supertest";
import path from "path";
import { pool } from "../config/pool.ts";
import app from "../app.ts";

describe("POST /auth/register", () => {
  beforeEach(async () => {
    await pool.query("BEGIN");
  });

  afterEach(async () => {
    await pool.query("ROLLBACK");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .field("full_name", "John Doe")
      .field("email", "john@test.com")
      .field("password", "Password123")
      .field("faculty_id", "1") // use an existing faculty id
      .field("contact_number", "9812345678")
      .attach("image", path.join(__dirname, "../fixtures/avatar.jpg"));

    expect(res.status).toBe(200);

    expect(res.body.success).toBe(true);

    expect(res.body.data.user.email).toBe("john@test.com");

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      "john@test.com",
    ]);

    expect(result.rows.length).toBe(1);
  });
});
