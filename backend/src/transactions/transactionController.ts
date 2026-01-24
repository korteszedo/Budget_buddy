import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import {
  addTransactionForUser,
  findOrCreateCategoryId,
  getBalanceByUserId,
  getExpenseSumsByCategory,
  getTransactionList,
} from "./transactionService";

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function normalizeDate(value: unknown) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return formatDate(new Date());
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return trimmed;
    }
    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) {
      return formatDate(parsed);
    }
  }
  return formatDate(new Date());
}

export async function addTransactionController(
  req: AuthenticatedRequest,
  res: Response
) {
  const userId = Number(req.user?.userId);
  if (!userId) {
    return res.status(400).json({ message: "Hianyzik a userId" });
  }

  const type = req.body?.tipus ?? req.body?.type;
  if (type !== "bevetel" && type !== "kiadas") {
    return res.status(400).json({ message: "Hibas tipus" });
  }

  const amountRaw = req.body?.osszeg ?? req.body?.amount;
  const amount = Number(amountRaw);
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: "Hibas osszeg" });
  }

  const categoryRaw = req.body?.kategoria ?? req.body?.category;
  const categoryText =
    typeof categoryRaw === "string" ? categoryRaw.trim() : "";
  const categoryIdRaw = req.body?.kategoria_id ?? req.body?.categoryId;
  const categoryIdValue = Number(categoryIdRaw);

  let categoryId = 0;
  try {
    if (Number.isFinite(categoryIdValue) && categoryIdValue > 0) {
      categoryId = categoryIdValue;
    } else if (categoryText) {
      categoryId = await findOrCreateCategoryId(categoryText, type);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Hiba a kategoria menteseor" });
  }

  if (!categoryId) {
    return res.status(400).json({ message: "Hibas kategoria" });
  }

  const date = normalizeDate(req.body?.datum ?? req.body?.date);

  try {
    const insertId = await addTransactionForUser(
      userId,
      categoryId,
      amount,
      type,
      date
    );
    return res.status(201).json({ id: insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Hiba a tranzakcio menteseor" });
  }
}

export async function getBalanceController(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.user?.userId);
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
  const userId = Number(req.user?.userId);
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
  const userId = Number(req.user?.userId);
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
