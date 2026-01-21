import { Router } from "express";
import { getGoalsController } from "./goalController";

const router = Router();

router.get("/", getGoalsController);

export default router;
