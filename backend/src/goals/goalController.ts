
import { Request, Response } from "express";
import { getGoalsByUserId } from "./goalService";

export async function getGoalsController(req: Request, res: Response) {
  const userId = Number(req.params.userId);

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

