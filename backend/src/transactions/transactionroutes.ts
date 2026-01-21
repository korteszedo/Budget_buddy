import { Router } from "express";
import {
  
  getBalanceController,
  getExpensesByCategoryController,
  getTransactionListController,
  
} from "./transactionController";

const router = Router();

router.get("/balance", getBalanceController);
router.get("/list", getTransactionListController);


router.get("/expenses-by-category", getExpensesByCategoryController);
export default router;
