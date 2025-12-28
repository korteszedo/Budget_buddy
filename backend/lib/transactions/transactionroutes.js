"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var transactionController_1 = require("./transactionController");
var router = (0, express_1.Router)();
router.get("/balance/:userId", transactionController_1.getBalanceController);
router.get("/list/:userId", transactionController_1.getTransactionListController);
router.get("/expenses-by-category/:userId", transactionController_1.getExpensesByCategoryController);
exports.default = router;
