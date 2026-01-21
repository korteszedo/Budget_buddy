import { Router } from "express";
import {
  
  getBalanceController,
  getExpensesByCategoryController,
  getTransactionListController,
  
} from "./transactionController";

const router = Router();

router.get("/balance", getBalanceController);
router.get("/balance/:userId", getBalanceController);
router.get("/list", getTransactionListController);
router.get("/list/:userId", getTransactionListController);


router.get("/expenses-by-category", getExpensesByCategoryController);
router.get("/expenses-by-category/:userId", getExpensesByCategoryController);
export default router;
