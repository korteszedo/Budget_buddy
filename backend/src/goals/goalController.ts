
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { getGoalsByUserId } from "./goalService";

function resolveUserId(req: AuthenticatedRequest) {
  const authIdRaw = req.auth?.userId;
  const authId = typeof authIdRaw === "string" ? Number(authIdRaw) : authIdRaw;
  if (typeof authId === "number" && Number.isFinite(authId) && authId > 0) {
    return authId;
  }

  const paramId = Number(req.params.userId);
  if (Number.isFinite(paramId) && paramId > 0) {
    return paramId;
  }

  return null;
}

export async function getGoalsController(req: AuthenticatedRequest, res: Response) {
  const userId = resolveUserId(req);
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

