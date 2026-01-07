import { Router } from "express";
import authRoutes from "../auth/authroutes";
import transactionRoutes from "../transactions/transactionroutes";
import goalRoutes from "../goals/goalsroutes"
import userRoutes from "../users/userroutes";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.use("/auth", authRoutes);
router.use("/transactions", verifyToken, transactionRoutes);
router.use("/goals", verifyToken, goalRoutes);
router.use("/users", verifyToken, userRoutes);

router.get("/", (_req, res) => res.send("futbazdmeg"));

export default router;
