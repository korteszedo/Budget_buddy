import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
export declare function getGoalsController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
