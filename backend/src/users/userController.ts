import { Request, Response } from "express";
import { deleteUserForRole2, updateUserForRole2 } from "./userServices";

export async function updateUserController(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const name = req.body.name ?? req.body.username ?? req.body.nev;
    const email = req.body.email;
    const password = req.body.password ?? req.body.jelszo;

    try {
        const affected = await updateUserForRole2(userId, name, email, password);
        return res.json({ affected });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Hiba a felhasznalo frissitesekor" });
    }
}

export async function deleteUserController(req: Request, res: Response) {
    const userId = Number(req.params.userId);

    try {
        const affected = await deleteUserForRole2(userId);
        return res.json({ affected });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Hiba a felhasznalo torlesekor" });
    }
}
