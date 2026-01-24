
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import {
  addGoalForUser,
  deleteGoalForUser,
  getGoalsByUserId,
  updateGoalProgressForUser,
} from "./goalService";

export async function getGoalsController(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.user?.userId);
  if (!userId) {
    return res.status(400).json({ message: "Hianyzik a userId" });
  }

  try {
    const goals = await getGoalsByUserId(userId);
    return res.json(goals);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Hiba a célok lekérésekor"
    });
  }
}

export async function addGoalController(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.user?.userId);
  if (!userId) {
    return res.status(400).json({ message: "Hianyzik a userId" });
  }

  const name = (req.body?.nev ?? req.body?.name ?? "").toString().trim();
  const targetRaw = req.body?.osszeg_cel ?? req.body?.cel ?? req.body?.target;
  const currentRaw = req.body?.aktualis_osszeg ?? req.body?.aktualis ?? req.body?.current;
  const deadlineRaw = req.body?.hatarido ?? req.body?.datum ?? req.body?.deadline;

  const target = Number(targetRaw);
  const current = Number(currentRaw);
  const deadline =
    typeof deadlineRaw === "string" && deadlineRaw.trim() !== ""
      ? deadlineRaw
      : null;

  if (!name || !Number.isFinite(target) || target <= 0) {
    return res.status(400).json({ message: "Hibas adatok" });
  }

  const safeCurrent = Number.isFinite(current) && current > 0 ? current : 0;

  try {
    const insertId = await addGoalForUser(
      userId,
      name,
      target,
      safeCurrent,
      deadline
    );
    return res.status(201).json({ id: insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Hiba a cel mentesekor" });
  }
}

export async function updateGoalController(
  req: AuthenticatedRequest,
  res: Response
) {
  const userId = Number(req.user?.userId);
  if (!userId) {
    return res.status(400).json({ message: "Hianyzik a userId" });
  }

  const goalId = Number(req.params.goalId);
  if (!goalId) {
    return res.status(400).json({ message: "Hianyzik a cel azonosito" });
  }

  const currentRaw = req.body?.aktualis_osszeg ?? req.body?.aktualis ?? req.body?.current;
  const current = Number(currentRaw);
  if (!Number.isFinite(current) || current < 0) {
    return res.status(400).json({ message: "Hibas aktualis osszeg" });
  }

  try {
    const affected = await updateGoalProgressForUser(userId, goalId, current);
    return res.json({ affected });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Hiba a cel frissitesekor" });
  }
}

export async function deleteGoalController(
  req: AuthenticatedRequest,
  res: Response
) {
  const userId = Number(req.user?.userId);
  if (!userId) {
    return res.status(400).json({ message: "Hianyzik a userId" });
  }

  const goalId = Number(req.params.goalId);
  if (!goalId) {
    return res.status(400).json({ message: "Hianyzik a cel azonosito" });
  }

  try {
    const affected = await deleteGoalForUser(userId, goalId);
    return res.json({ affected });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Hiba a cel torlesekor" });
  }
}

