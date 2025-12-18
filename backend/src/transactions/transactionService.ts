import { db } from "../config/db";

export async function getBalanceByUserId(userId: number) {
  const [rows]: any = await db.query(
    `
    SELECT
      COALESCE(SUM(
        CASE
          WHEN tipus = 'bevetel' THEN osszeg
          ELSE -osszeg
        END
      ), 0) AS egyenleg
    FROM Tranzakcio
    WHERE felhasznalo_id = ?
    `,
    [userId]
  );

  return rows[0].egyenleg;
}



export async function getTransactionList(userId: number) {
  const [rows]: any = await db.query(
    `
    SELECT
      osszeg,
      tipus
    FROM Tranzakcio
    WHERE felhasznalo_id = ?
    ORDER BY datum DESC
    `,
    [userId]
  );

  return rows;
}



export async function getExpenseSumsByCategory(userId: number) {
  const [rows]: any = await db.query(
    `
    SELECT
      k.kategoria_nev AS kategoria,
      SUM(t.osszeg) AS osszeg
    FROM Tranzakcio t
    JOIN Kategoria k ON k.kategoria_id = t.kategoria_id
    WHERE t.felhasznalo_id = ?
      AND t.tipus = 'kiadas'
    GROUP BY k.kategoria_nev
    ORDER BY osszeg DESC
    `,
    [userId]
  );

  return rows;
}

