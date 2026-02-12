process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

import request from "supertest";
import app from "../app/app";

async function createUserAndLogin() {
  const suffix = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const user = {
    name: `Goal Test User ${suffix}`,
    email: `goal_${suffix}@example.com`,
    password: "Test1234!",
  };

  const registerResponse = await request(app).post("/auth/register").send(user);
  expect(registerResponse.status).toBe(200);
  expect(registerResponse.body.userId).toBeGreaterThan(0);

  const loginResponse = await request(app).post("/auth/login").send({
    email: user.email,
    password: user.password,
  });
  expect(loginResponse.status).toBe(200);
  expect(loginResponse.body.token).toEqual(expect.any(String));

  return loginResponse.body.token as string;
}

describe("Goals API", () => {
  let token = "";
  let goalId = 0;

  beforeAll(async () => {
    token = await createUserAndLogin();
  });

  it("GET /goals returns 403 without token", async () => {
    const response = await request(app).get("/goals");

    expect(response.status).toBe(403);
  });

  it("POST /goals creates a goal on success", async () => {
    const response = await request(app)
      .post("/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Laptop vasarlas",
        target: 500000,
        current: 10000,
        deadline: "2026-12-31",
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toEqual(expect.any(Number));
    expect(response.body.id).toBeGreaterThan(0);
    goalId = response.body.id;
  });

  it("POST /goals returns 400 for invalid payload", async () => {
    const response = await request(app)
      .post("/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Hibas cel",
        target: 0,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Hibas adatok");
  });

  it("GET /goals returns goal list on success", async () => {
    const response = await request(app)
      .get("/goals")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("PATCH /goals/:goalId updates goal progress on success", async () => {
    const response = await request(app)
      .patch(`/goals/${goalId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        current: 20000,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("affected");
  });

  it("PATCH /goals/:goalId returns 400 for invalid goalId", async () => {
    const response = await request(app)
      .patch("/goals/0")
      .set("Authorization", `Bearer ${token}`)
      .send({
        current: 20000,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Hianyzik a cel azonosito");
  });

  it("DELETE /goals/:goalId deletes goal on success", async () => {
    const response = await request(app)
      .delete(`/goals/${goalId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("affected");
  });

  it("DELETE /goals/:goalId returns 400 for invalid goalId", async () => {
    const response = await request(app)
      .delete("/goals/0")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Hianyzik a cel azonosito");
  });
});
