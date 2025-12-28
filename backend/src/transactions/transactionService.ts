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
      tipus,
      datum
    FROM Tranzakcio
    WHERE felhasznalo_id = ?
    ORDER BY datum DESC
    `,
    [userId]
  );

  return rows;
}

export async function updateTransactionForRole2(
  userId: number,
  transactionId: number,
  osszeg?: number,
  tipus?: string,
  datum?: string
) {
  const updates: string[] = [];
  const values: Array<number | string> = [];

  if (typeof osszeg !== "undefined") {
    updates.push("t.osszeg = ?");
    values.push(osszeg);
  }
  if (typeof tipus !== "undefined") {
    updates.push("t.tipus = ?");
    values.push(tipus);
  }
  if (typeof datum !== "undefined") {
    updates.push("t.datum = ?");
    values.push(datum);
  }

  if (updates.length === 0) {
    return 0;
  }

  values.push(transactionId, userId);

  const [result]: any = await db.query(
    `
    UPDATE Tranzakcio t
    JOIN Felhasznalo f ON f.felhasznalo_id = t.felhasznalo_id
    SET ${updates.join(", ")}
    WHERE t.tranzakcio_id = ?
      AND f.felhasznalo_id = ?
      AND f.szerepkor_id = 2
    `,
    values
  );

  return result.affectedRows ?? 0;
}

export async function deleteTransactionForRole2(userId: number, transactionId: number) {
  const [result]: any = await db.query(
    `
    DELETE t
    FROM Tranzakcio t
    JOIN Felhasznalo f ON f.felhasznalo_id = t.felhasznalo_id
    WHERE t.tranzakcio_id = ?
      AND f.felhasznalo_id = ?
      AND f.szerepkor_id = 2
    `,
    [transactionId, userId]
  );

  return result.affectedRows ?? 0;
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

export async function getExpensesByCategory(userId: number) {
  return getExpenseSumsByCategory(userId);
}

