import { Router } from "express";
import { getBalanceController,getTransactionListController,getExpensesByCategoryController } from "./transactionController";

const router = Router();

router.get("/balance/:userId", getBalanceController);
router.get("/list/:userId", getTransactionListController);

router.get("/expenses-by-category/:userId", getExpensesByCategoryController);
export default router;
