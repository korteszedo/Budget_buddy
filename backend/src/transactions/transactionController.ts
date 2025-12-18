import { Request, Response } from "express";
import { getBalanceByUserId,getTransactionList, getExpenseSumsByCategory } from "./transactionService";


export async function getBalanceController(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  try {
    const balance = await getBalanceByUserId(userId);

    res.json({
      egyenleg: balance
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hiba egyenleg lekérésekor" });
  }
}


export async function getTransactionListController(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  try {
    const list = await getTransactionList(userId);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hiba a tranzakciók lekérésekor" });
  }
}




export async function getExpensesByCategoryController(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  try {
    const data = await getExpenseSumsByCategory(userId);
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Hiba a kategória összesítésnél" });
  }
}
