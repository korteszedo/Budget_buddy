import { db } from "../config/db";

export async function getGoalsByUserId(userId: number) {
  const [rows]: any = await db.query(
    `
    SELECT
      nev,
      aktualis_osszeg AS aktualis,
      osszeg_cel AS cel
    FROM Cel
    WHERE felhasznalo_id = ?
    `,
    [userId]
  );

  return rows;
}
