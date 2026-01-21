
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { getGoalsByUserId } from "./goalService";

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

