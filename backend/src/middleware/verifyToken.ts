import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

export interface AuthenticatedRequest extends Request {
  auth?: JwtPayload & { userId?: number | string; roleId?: number | string };
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const bodyToken = typeof req.body?.token === "string" ? req.body.token : undefined;
  const queryToken = typeof req.query?.token === "string" ? req.query.token : undefined;
  const headerToken =
    typeof req.headers["x-access-token"] === "string" ? req.headers["x-access-token"] : undefined;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

  const token = bodyToken || queryToken || headerToken || bearerToken;
  if (!token) {
    return res.status(403).json({ message: "Token szukseges a hozzafereshez" });
  }

  const secret = config.jwtSecret;
  if (!secret) {
    return res.status(500).json({ message: "JWT secret nincs beallitva" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Ervenytelen token" });
    }
    req.auth = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: "Ervenytelen token" });
  }
};

export default verifyToken;
