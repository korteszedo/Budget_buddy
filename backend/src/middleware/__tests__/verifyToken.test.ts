import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import verifyToken, { AuthenticatedRequest } from "../verifyToken";
import config from "../../config/config";

type MockResponse = {
  statusCode: number;
  body: unknown;
  status: (code: number) => MockResponse;
  json: (payload: unknown) => MockResponse;
};

const originalSecret = config.jwtSecret;

function createRes(): MockResponse {
  return {
    statusCode: 200,
    body: null,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };
}

function createReq(overrides: Partial<AuthenticatedRequest> = {}): AuthenticatedRequest {
  return {
    body: {},
    query: {},
    headers: {},
    ...overrides,
  } as AuthenticatedRequest;
}

test.after(() => {
  config.jwtSecret = originalSecret;
});

test("returns 403 when token is missing", () => {
  const req = createReq();
  const res = createRes();
  let nextCalled = false;

  verifyToken(req, res as any, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 403);
  assert.deepEqual(res.body, { message: "Token szukseges a hozzafereshez" });
});

test("returns 500 when jwt secret is not set", () => {
  config.jwtSecret = undefined;
  const req = createReq({
    headers: {
      authorization: "Bearer token",
    },
  });
  const res = createRes();
  let nextCalled = false;

  verifyToken(req, res as any, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { message: "JWT secret nincs beallitva" });
});

test("returns 401 when token is invalid", () => {
  config.jwtSecret = "test-secret";
  const req = createReq({
    headers: {
      authorization: "Bearer invalid-token",
    },
  });
  const res = createRes();
  let nextCalled = false;

  verifyToken(req, res as any, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, { message: "Ervenytelen token" });
});

test("calls next and attaches user when token is valid", () => {
  const secret = "valid-secret";
  config.jwtSecret = secret;
  const token = jwt.sign({ userId: 7, roleId: 1 }, secret);
  const req = createReq({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const res = createRes();
  let nextCalled = false;

  verifyToken(req, res as any, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(res.statusCode, 200);
  assert.equal(req.user?.userId, 7);
});
