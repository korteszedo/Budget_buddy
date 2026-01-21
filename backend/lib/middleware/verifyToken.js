"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var verifyToken = function (req, res, next) {
    var _a, _b;
    var bodyToken = typeof ((_a = req.body) === null || _a === void 0 ? void 0 : _a.token) === "string" ? req.body.token : undefined;
    var queryToken = typeof ((_b = req.query) === null || _b === void 0 ? void 0 : _b.token) === "string" ? req.query.token : undefined;
    var headerToken = typeof req.headers["x-access-token"] === "string" ? req.headers["x-access-token"] : undefined;
    var authHeader = req.headers.authorization;
    var bearerToken = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer ")) ? authHeader.slice(7) : undefined;
    var token = bodyToken || queryToken || headerToken || bearerToken;
    if (!token) {
        return res.status(403).json({ message: "Token szukseges a hozzafereshez" });
    }
    var secret = config_1.default.jwtSecret;
    if (!secret) {
        return res.status(500).json({ message: "JWT secret nincs beallitva" });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, secret);
        if (typeof decoded === "string") {
            return res.status(401).json({ message: "Ervenytelen token" });
        }
        req.auth = decoded;
        return next();
    }
    catch (_c) {
        return res.status(401).json({ message: "Ervenytelen token" });
    }
};
exports.default = verifyToken;
