import { Router } from "express";
import authRoutes from "../auth/authroutes";
import transactionRoutes from "../transactions/transactionroutes";
import goalRoutes from "../goals/goalsroutes"
import userRoutes from "../users/userroutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/transactions", transactionRoutes);
router.use("/goals", goalRoutes);
router.use("/users", userRoutes);

router.get("/", (_req, res) => res.send("futbazdmeg"));

export default router;
