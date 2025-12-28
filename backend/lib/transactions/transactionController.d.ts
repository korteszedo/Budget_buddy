import { Request, Response } from "express";
export declare function getBalanceController(req: Request, res: Response): Promise<void>;
export declare function getTransactionListController(req: Request, res: Response): Promise<void>;
export declare function getExpensesByCategoryController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
