import { Router } from "express";
import {
  addGoalController,
  deleteGoalController,
  getGoalsController,
  updateGoalController,
} from "./goalController";

const router = Router();

router.get("/", getGoalsController);
router.post("/", addGoalController);
router.patch("/:goalId", updateGoalController);
router.delete("/:goalId", deleteGoalController);

export default router;
