import { db } from "../config/db";

export async function getGoalsByUserId(userId: number) {
  const [rows]: any = await db.query(
    `
    SELECT
      *,
      aktualis_osszeg AS aktualis,
      osszeg_cel AS cel
    FROM Cel
    WHERE felhasznalo_id = ?
    `,
    [userId]
  );

  return rows;
}

export async function addGoalForUser(
  userId: number,
  name: string,
  target: number,
  current: number,
  deadline: string | null
) {
  const [result]: any = await db.query(
    `
    INSERT INTO Cel (felhasznalo_id, nev, osszeg_cel, aktualis_osszeg, hatarido)
    VALUES (?, ?, ?, ?, ?)
    `,
    [userId, name, target, current, deadline]
  );

  return result.insertId ?? 0;
}

export async function updateGoalProgressForUser(
  userId: number,
  goalId: number,
  current: number
) {
  const [result]: any = await db.query(
    `
    UPDATE Cel
    SET aktualis_osszeg = ?
    WHERE cel_id = ?
      AND felhasznalo_id = ?
    `,
    [current, goalId, userId]
  );

  return result.affectedRows ?? 0;
}

export async function deleteGoalForUser(userId: number, goalId: number) {
  const [result]: any = await db.query(
    `
    DELETE FROM Cel
    WHERE cel_id = ?
      AND felhasznalo_id = ?
    `,
    [goalId, userId]
  );

  return result.affectedRows ?? 0;
}
