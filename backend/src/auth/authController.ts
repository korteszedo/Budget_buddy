import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { getUserById, loginUser, registerUser } from "../users/userServices";

export async function loginController(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const userId = await loginUser(email, password);

        if (userId === 0) {
            return res.status(401).json({
                message: "Hibas email vagy jelszo"
            });
        }

        const user = await getUserById(userId);
        if (!user) {
            return res.status(500).json({ message: "Felhasznalo nem talalhato" });
        }

        const roleId = user.szerepkor_id;

        const secret = config.jwtSecret;
        if (!secret) {
            return res.status(500).json({ message: "JWT secret nincs beallitva" });
        }

        const token = jwt.sign(
            { userId, roleId },
            secret,
            { expiresIn: config.jwtExpiresIn }
        );

        return res.json({
            message: "Sikeres bejelentkezes",
            userId,
            token,
            szerepkor_id: roleId,
            roleId
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Szerver hiba"
        });
    }
}

export async function registerController(req: Request, res: Response) {
    const name = req.body.name ?? req.body.username;
    const email = req.body.email;
    const password = req.body.password ?? req.body.jelszo;

    try {
        const userId = await registerUser(name, email, password);
        return res.json({ userId });
    } catch (err) {
        console.error(err);
        return res.json({ userId: 0 });
    }
}
