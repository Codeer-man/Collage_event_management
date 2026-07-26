import request from "supertest";
import app from "../../app.js";

describe("Auth login", () => {
  it("it login in to a user", async () => {
    const resp = await request(app).post("/auth/login").send({
      email: "nepaldai77@gmail.com",
      password: "123456789",
    });

    expect(resp.status).toBe(200);

    expect(resp.headers["set-cookie"]).toBeDefined();
    expect(resp.headers["set-cookie"]![0]).toContain("accessToken=");

    expect(resp.body.data.user.email).toBe("nepaldai77@gmail.com");
  });
});
