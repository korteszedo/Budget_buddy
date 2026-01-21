import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
export declare function getUsersController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateUserController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteUserController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
