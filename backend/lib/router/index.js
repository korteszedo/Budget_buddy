"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authroutes_1 = __importDefault(require("../auth/authroutes"));
var transactionroutes_1 = __importDefault(require("../transactions/transactionroutes"));
var goalsroutes_1 = __importDefault(require("../goals/goalsroutes"));
var userroutes_1 = __importDefault(require("../users/userroutes"));
var verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
var router = (0, express_1.Router)();
router.use("/auth", authroutes_1.default);
router.use("/transactions", verifyToken_1.default, transactionroutes_1.default);
router.use("/goals", verifyToken_1.default, goalsroutes_1.default);
router.use("/users", verifyToken_1.default, userroutes_1.default);
router.get("/", function (_req, res) { return res.send("futbazdmeg"); });
exports.default = router;
