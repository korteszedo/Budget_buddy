import { NextFunction, Response, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface AuthenticatedRequest extends Request {
    auth?: JwtPayload & {
        userId?: number | string;
        roleId?: number | string;
    };
}
declare const verifyToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export default verifyToken;
