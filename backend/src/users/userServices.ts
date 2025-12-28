
import { db } from "../config/db";

export async function loginUser(email: string, password: string) {
    const [rows]: any = await db.query(
        "SELECT login(?, ?) AS id",
        [email, password]
    );   
    if (rows[0].id === 0) { //ha az id 0 akkor nem jok az adatok
        return 0;
    }

   
    return rows[0].id;//ha az id nagyobb mint 0 akkor jo a bejelentkeezs
}

export async function registerUser(name: string, email: string, password: string) {
    const [result]: any = await db.query(
        "INSERT INTO Felhasznalo (nev, email, jelszo, szerepkor_id) VALUES (?, ?, ?, ?)",
        [name, email, password, 2]
    );

    return result.insertId ?? 0;
}

export async function updateUserForRole2(
    userId: number,
    name?: string,
    email?: string,
    password?: string
) {
    const updates: string[] = [];
    const values: Array<number | string> = [];

    if (typeof name !== "undefined") {
        updates.push("nev = ?");
        values.push(name);
    }

    if (typeof email !== "undefined") {
        updates.push("email = ?");
        values.push(email);
    }

    if (typeof password !== "undefined") {
        updates.push("jelszo = pwd_encrypt(?)");
        values.push(password);
    }

    if (updates.length === 0) {
        return 0;
    }

    values.push(userId);

    const [result]: any = await db.query(
        `
        UPDATE Felhasznalo
        SET ${updates.join(", ")}
        WHERE felhasznalo_id = ?
          AND szerepkor_id = 2
        `,
        values
    );

    return result.affectedRows ?? 0;
}

export async function deleteUserForRole2(userId: number) {
    const [result]: any = await db.query(
        `
        DELETE FROM Felhasznalo
        WHERE felhasznalo_id = ?
          AND szerepkor_id = 2
        `,
        [userId]
    );

    return result.affectedRows ?? 0;
}
