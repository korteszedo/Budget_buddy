export const data = {
  felhasznalok: [
    {
      felhasznalo_id: 1,
      nev: "Teszt Elek",
      email: "teszt@example.com",
      jelszo: "1234",
      szerepkor_id: 1
    }
  ],

  szerepkorok: [
    { szerepkor_id: 1, szerepkor_nev: "felhasznalo" },
    { szerepkor_id: 2, szerepkor_nev: "admin" }
  ],

  tranzakciok: [
    {
      tranzakcio_id: 1,
      felhasznalo_id: 1,
      kategoria_id: 1,
      osszeg: 50000,
      datum: "2025-11-20",
      tipus: "Bevétel"
    },
    {
      tranzakcio_id: 2,
      felhasznalo_id: 1,
      kategoria_id: 2,
      osszeg: 12000,
      datum: "2025-11-21",
      tipus: "Kiadás"
    }
  ],

  kategoriak: [
    { kategoria_id: 1, kategoria_nev: "Fizetés", tipus: "Bevétel" },
    { kategoria_id: 2, kategoria_nev: "Élelmiszer", tipus: "Kiadás" }
  ],

  celok: [
    {
      cel_id: 1,
      felhasznalo_id: 1,
      nev: "Laptop",
      osszeg_cel: 300000,
      aktualis_osszeg: 120000,
      hatarido: "2026-03-01",
      elerte_e: false
    }
  ]
};

