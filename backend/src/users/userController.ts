import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { deleteUserByAdmin, getUsersForAdmin, updateUserByAdmin } from "./userServices";

const ADMIN_ROLE_ID = 2;

export async function getUsersController(req: AuthenticatedRequest, res: Response) {
    const roleId = Number(req.user?.roleId);
    if (roleId !== ADMIN_ROLE_ID) {
        return res.status(403).json({ message: "Nincs jogosultsag" });
    }

    try {
        const users = await getUsersForAdmin();
        return res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Hiba a felhasznalok lekeresekor" });
    }
}

export async function updateUserController(req: AuthenticatedRequest, res: Response) {
    const roleId = Number(req.user?.roleId);
    if (roleId !== ADMIN_ROLE_ID) {
        return res.status(403).json({ message: "Nincs jogosultsag" });
    }

    const userId = Number(req.params.userId);
    const name = req.body.name ?? req.body.username ?? req.body.nev;
    const email = req.body.email;
    const password = req.body.password ?? req.body.jelszo;

    try {
        const affected = await updateUserByAdmin(userId, name, email, password);
        return res.json({ affected });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Hiba a felhasznalo frissitesekor" });
    }
}

export async function deleteUserController(req: AuthenticatedRequest, res: Response) {
    const roleId = Number(req.user?.roleId);
    if (roleId !== ADMIN_ROLE_ID) {
        return res.status(403).json({ message: "Nincs jogosultsag" });
    }

    const userId = Number(req.params.userId);

    try {
        const affected = await deleteUserByAdmin(userId);
        return res.json({ affected });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Hiba a felhasznalo torlesekor" });
    }
}
