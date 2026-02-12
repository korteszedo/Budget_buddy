"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var verifyToken = function (req, res, next) {
    var _a, _b, _c;
    var token;
    if (typeof ((_a = req.body) === null || _a === void 0 ? void 0 : _a.token) === "string") {
        token = req.body.token;
    }
    if (!token && typeof ((_b = req.query) === null || _b === void 0 ? void 0 : _b.token) === "string") {
        token = req.query.token;
    }
    if (!token && typeof req.headers["x-access-token"] === "string") {
        token = req.headers["x-access-token"];
    }
    if (!token && ((_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.startsWith("Bearer "))) {
        token = req.headers.authorization.slice(7);
    }
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
        req.user = decoded;
        return next();
    }
    catch (_d) {
        return res.status(401).json({ message: "Ervenytelen token" });
    }
};
exports.default = verifyToken;
