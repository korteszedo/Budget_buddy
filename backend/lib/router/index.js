"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authroutes_1 = __importDefault(require("../auth/authroutes"));
var router = (0, express_1.Router)();
router.use("/auth", authroutes_1.default);
router.get("/", function (req, res) { res.send("futbazdmeg"); });
exports.default = router;
