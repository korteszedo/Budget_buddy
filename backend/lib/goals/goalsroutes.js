"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var goalController_1 = require("./goalController");
var router = (0, express_1.Router)();
router.get("/:userId", goalController_1.getGoalsController);
exports.default = router;
