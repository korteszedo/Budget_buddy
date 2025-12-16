import { Request, Response } from "express";
import { loginUser } from "../users/userServices";

export async function loginController(req: Request, res: Response) {
 const { email, password } = req.body;

    try {
        const userId = await loginUser(email, password);

        if (userId === 0) {
            return res.status(401).json({
                message: "Hibás email vagy jelszó"
            });
        }

        return res.json({
            message: "Sikeres bejelentkezés",
            userId
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Szerver hiba"
        });
    }
}