process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

import request from "supertest";
import app from "../app/app";

async function createUserAndLogin() {
  const suffix = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const user = {
    name: `Tx Test User ${suffix}`,
    email: `tx_${suffix}@example.com`,
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

describe("Transactions API", () => {
  let token = "";

  beforeAll(async () => {
    token = await createUserAndLogin();
  });

  it("GET /transactions/list returns 403 without token", async () => {
    const response = await request(app).get("/transactions/list");

    expect(response.status).toBe(403);
  });

  it("POST /transactions creates a transaction on success", async () => {
    const response = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "kiadas",
        amount: 1200,
        category: "Teszt kategoria",
        date: "2026-02-10",
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toEqual(expect.any(Number));
    expect(response.body.id).toBeGreaterThan(0);
  });

  it("POST /transactions returns 400 for invalid amount", async () => {
    const response = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "kiadas",
        amount: -50,
        category: "Teszt kategoria",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Hibas osszeg");
  });

  it("GET /transactions/list returns transaction array on success", async () => {
    const response = await request(app)
      .get("/transactions/list")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /transactions/balance returns balance on success", async () => {
    const response = await request(app)
      .get("/transactions/balance")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("egyenleg");
  });

  it("GET /transactions/balance returns 403 without token", async () => {
    const response = await request(app).get("/transactions/balance");

    expect(response.status).toBe(403);
  });

  it("GET /transactions/expenses-by-category returns grouped data on success", async () => {
    const response = await request(app)
      .get("/transactions/expenses-by-category")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /transactions/expenses-by-category returns 403 without token", async () => {
    const response = await request(app).get("/transactions/expenses-by-category");

    expect(response.status).toBe(403);
  });
});
