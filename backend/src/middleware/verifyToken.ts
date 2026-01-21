import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { userId?: number | string; roleId?: number | string };
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (typeof req.body?.token === "string") {
    token = req.body.token;
  }
  if (!token && typeof req.query?.token === "string") {
    token = req.query.token;
  }
  if (!token && typeof req.headers["x-access-token"] === "string") {
    token = req.headers["x-access-token"];
  }
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.slice(7);
  }

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
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: "Ervenytelen token" });
  }
};

export default verifyToken;
