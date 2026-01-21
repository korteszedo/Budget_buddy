"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("./userController");
var router = (0, express_1.Router)();
router.get("/", userController_1.getUsersController);
router.put("/:userId", userController_1.updateUserController);
router.delete("/:userId", userController_1.deleteUserController);
exports.default = router;
