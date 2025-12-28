import { Request, Response } from "express";
import { loginUser, registerUser } from "../users/userServices";

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
