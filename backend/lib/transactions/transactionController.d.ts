import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
export declare function getBalanceController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getTransactionListController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getExpensesByCategoryController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
