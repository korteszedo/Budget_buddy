import { Router } from "express";
import authRoutes from "../auth/authroutes";
import transactionRoutes from "../transactions/transactionroutes";
import goalRoutes from "../goals/goalsroutes"

const router = Router();

router.use("/auth", authRoutes);
router.use("/transactions", transactionRoutes);
router.use("/goals", goalRoutes);

router.get("/", (_req, res) => res.send("futbazdmeg"));

export default router;
