"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("./authController");
var router = (0, express_1.Router)();
router.post("/login", authController_1.loginController);
router.post("/register", authController_1.registerController);
exports.default = router;
