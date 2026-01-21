"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: ((_a = process.env.JWT_EXPIRES_IN) !== null && _a !== void 0 ? _a : "2h")
};
exports.default = config;
