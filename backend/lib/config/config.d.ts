import type { SignOptions } from "jsonwebtoken";
declare const config: {
    jwtSecret: string | undefined;
    jwtExpiresIn: SignOptions["expiresIn"];
};
export default config;
