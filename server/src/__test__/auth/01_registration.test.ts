import request from "supertest";
import app from "../../app.js";
import path from "node:path";

describe("Register new user", () => {
  it("should create a new user", async () => {
    const resp = await request(app)
      .post("/auth/register")
      .field("full_name", "John cena")
      .field("email", "mdrmoney@gmail.com")
      .field("password", "Password123")
      .field("faculty_id", "e570e6b3-812b-4500-88cc-8758bffaee53")
      .field("contact_number", "9876543212")
      .attach("image", path.join(__dirname, "../fixture/profile.jpg"));

    expect(resp.status).toBe(200);
  });
});
