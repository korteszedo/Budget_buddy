import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";

dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN ?? "2h") as SignOptions["expiresIn"]
};

export default config;
