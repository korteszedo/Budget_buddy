import { Router } from "express";
import { getGoalsController } from "./goalController";

const router = Router();

router.get("/", getGoalsController);
router.get("/:userId", getGoalsController);

export default router;
