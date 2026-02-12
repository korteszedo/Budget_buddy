process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

import request from "supertest";
import app from "../app/app";

describe("Auth API", () => {
  const suffix = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const user = {
    name: `Auth Test User ${suffix}`,
    email: `auth_${suffix}@example.com`,
    password: "Test1234!",
  };

  it("POST /auth/register returns userId on success", async () => {
    const response = await request(app).post("/auth/register").send(user);

    expect(response.status).toBe(200);
    expect(response.body.userId).toEqual(expect.any(Number));
    expect(response.body.userId).toBeGreaterThan(0);
  });

  it("POST /auth/register returns userId 0 on duplicate email", async () => {
    const response = await request(app).post("/auth/register").send(user);

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe(0);
  });

  it("POST /auth/login returns JWT token on success", async () => {
    const response = await request(app).post("/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.userId).toEqual(expect.any(Number));
  });

  it("POST /auth/login returns 401 on invalid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: user.email,
      password: "wrong-password",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Hibas email vagy jelszo");
  });

  it("returns 404 for unknown route", async () => {
    const response = await request(app).get("/does-not-exist");

    expect(response.status).toBe(404);
  });
});
