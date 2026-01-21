import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { deleteUserForRole2, getUsersForAdmin, updateUserForRole2 } from "./userServices";

const ADMIN_ROLE_ID = 1;

function resolveRoleId(req: AuthenticatedRequest) {
    const roleIdRaw = req.auth?.roleId;
    const roleId = typeof roleIdRaw === "string" ? Number(roleIdRaw) : roleIdRaw;
    if (typeof roleId === "number" && Number.isFinite(roleId)) {
        return roleId;
    }
    return null;
}

function ensureAdmin(req: AuthenticatedRequest, res: Response) {
    const roleId = resolveRoleId(req);
    if (roleId !== ADMIN_ROLE_ID) {
        res.status(403).json({ message: "Nincs jogosultsag" });
        return false;
    }
    return true;
}

export async function getUsersController(req: AuthenticatedRequest, res: Response) {
    if (!ensureAdmin(req, res)) {
        return;
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
    if (!ensureAdmin(req, res)) {
        return;
    }

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

export async function deleteUserController(req: AuthenticatedRequest, res: Response) {
    if (!ensureAdmin(req, res)) {
        return;
    }

    const userId = Number(req.params.userId);

    try {
        const affected = await deleteUserForRole2(userId);
        return res.json({ affected });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Hiba a felhasznalo torlesekor" });
    }
}
