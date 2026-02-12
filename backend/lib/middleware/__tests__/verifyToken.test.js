"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_test_1 = __importDefault(require("node:test"));
var strict_1 = __importDefault(require("node:assert/strict"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken_1 = __importDefault(require("../verifyToken"));
var config_1 = __importDefault(require("../../config/config"));
var originalSecret = config_1.default.jwtSecret;
function createRes() {
    return {
        statusCode: 200,
        body: null,
        status: function (code) {
            this.statusCode = code;
            return this;
        },
        json: function (payload) {
            this.body = payload;
            return this;
        },
    };
}
function createReq(overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __assign({ body: {}, query: {}, headers: {} }, overrides);
}
node_test_1.default.after(function () {
    config_1.default.jwtSecret = originalSecret;
});
(0, node_test_1.default)("returns 403 when token is missing", function () {
    var req = createReq();
    var res = createRes();
    var nextCalled = false;
    (0, verifyToken_1.default)(req, res, function () {
        nextCalled = true;
    });
    strict_1.default.equal(nextCalled, false);
    strict_1.default.equal(res.statusCode, 403);
    strict_1.default.deepEqual(res.body, { message: "Token szukseges a hozzafereshez" });
});
(0, node_test_1.default)("returns 500 when jwt secret is not set", function () {
    config_1.default.jwtSecret = undefined;
    var req = createReq({
        headers: {
            authorization: "Bearer token",
        },
    });
    var res = createRes();
    var nextCalled = false;
    (0, verifyToken_1.default)(req, res, function () {
        nextCalled = true;
    });
    strict_1.default.equal(nextCalled, false);
    strict_1.default.equal(res.statusCode, 500);
    strict_1.default.deepEqual(res.body, { message: "JWT secret nincs beallitva" });
});
(0, node_test_1.default)("returns 401 when token is invalid", function () {
    config_1.default.jwtSecret = "test-secret";
    var req = createReq({
        headers: {
            authorization: "Bearer invalid-token",
        },
    });
    var res = createRes();
    var nextCalled = false;
    (0, verifyToken_1.default)(req, res, function () {
        nextCalled = true;
    });
    strict_1.default.equal(nextCalled, false);
    strict_1.default.equal(res.statusCode, 401);
    strict_1.default.deepEqual(res.body, { message: "Ervenytelen token" });
});
(0, node_test_1.default)("calls next and attaches user when token is valid", function () {
    var _a;
    var secret = "valid-secret";
    config_1.default.jwtSecret = secret;
    var token = jsonwebtoken_1.default.sign({ userId: 7, roleId: 1 }, secret);
    var req = createReq({
        headers: {
            authorization: "Bearer ".concat(token),
        },
    });
    var res = createRes();
    var nextCalled = false;
    (0, verifyToken_1.default)(req, res, function () {
        nextCalled = true;
    });
    strict_1.default.equal(nextCalled, true);
    strict_1.default.equal(res.statusCode, 200);
    strict_1.default.equal((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId, 7);
});
