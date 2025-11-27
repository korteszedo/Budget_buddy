
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
