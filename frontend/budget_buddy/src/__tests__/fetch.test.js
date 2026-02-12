import test, { beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { login, register, addTransaction, getBalance } from "../fetch.js";

let lastCall = null;
let originalFetch = null;

beforeEach(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options = {}) => {
    lastCall = { url, options };
    return {
      json: async () => ({ ok: true }),
    };
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  lastCall = null;
});

test("login sends email and password", async () => {
  const result = await login("user@example.com", "secret");

  assert.deepEqual(result, { ok: true });
  assert.equal(lastCall.url, "http://localhost:3000/auth/login");
  assert.equal(lastCall.options.method, "POST");
  assert.equal(lastCall.options.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(lastCall.options.body), {
    email: "user@example.com",
    password: "secret",
  });
});

test("register sends name, email, and password", async () => {
  const result = await register("Test User", "user@example.com", "secret");

  assert.deepEqual(result, { ok: true });
  assert.equal(lastCall.url, "http://localhost:3000/auth/register");
  assert.equal(lastCall.options.method, "POST");
  assert.equal(lastCall.options.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(lastCall.options.body), {
    name: "Test User",
    email: "user@example.com",
    password: "secret",
  });
});

test("addTransaction sends token and payload", async () => {
  const result = await addTransaction(
    "token-123",
    "bevetel",
    1200,
    "fizetes",
    "2025-01-01"
  );

  assert.deepEqual(result, { ok: true });
  assert.equal(lastCall.url, "http://localhost:3000/transactions");
  assert.equal(lastCall.options.method, "POST");
  assert.equal(lastCall.options.headers.Authorization, "Bearer token-123");
  assert.deepEqual(JSON.parse(lastCall.options.body), {
    tipus: "bevetel",
    osszeg: 1200,
    kategoria: "fizetes",
    datum: "2025-01-01",
  });
});

test("getBalance sends token in headers", async () => {
  const result = await getBalance("token-456");

  assert.deepEqual(result, { ok: true });
  assert.equal(lastCall.url, "http://localhost:3000/transactions/balance");
  assert.equal(lastCall.options.headers.Authorization, "Bearer token-456");
});
