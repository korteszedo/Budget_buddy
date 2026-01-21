import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import {
 
  getBalanceByUserId,
  getExpenseSumsByCategory,
  getTransactionList,
  
} from "./transactionService";


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

export async function getBalanceController(req: AuthenticatedRequest, res: Response) {
  const userId = resolveUserId(req);
  if (!userId) {
    return res.status(400).json({ message: "Hianyzik a userId" });
  }

  try {
    const balance = await getBalanceByUserId(userId);

    return res.json({
      egyenleg: balance
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Hiba egyenleg lekérésekor" });
  }
}


export async function getTransactionListController(req: AuthenticatedRequest, res: Response) {
  const userId = resolveUserId(req);
  if (!userId) {
    return res.status(400).json({ message: "Hianyzik a userId" });
  }

  try {
    const list = await getTransactionList(userId);
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Hiba a tranzakciók lekérésekor" });
  }
}




export async function getExpensesByCategoryController(req: AuthenticatedRequest, res: Response) {
  const userId = resolveUserId(req);
  if (!userId) {
    return res.status(400).json({ message: "Hianyzik a userId" });
  }

  try {
    const data = await getExpenseSumsByCategory(userId);
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Hiba a kategória összesítésnél" });
  }
}
