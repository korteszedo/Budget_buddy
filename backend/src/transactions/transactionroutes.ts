import { Router } from "express";
import {
  addTransactionController,
  getBalanceController,
  getExpensesByCategoryController,
  getTransactionListController,
} from "./transactionController";

const router = Router();

router.get("/balance", getBalanceController);
router.get("/list", getTransactionListController);
router.post("/", addTransactionController);


router.get("/expenses-by-category", getExpensesByCategoryController);
export default router;
