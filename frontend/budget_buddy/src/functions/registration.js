import { data } from "../data";

export function listUsers(){
  return data;
};

// ---- Regisztráció ----
export function registration(email, felhasznalonev, jelszo){
  
  const new_user = {
    felhasznalo_id: data.felhasznalok.length === 0 ? 1 : Math.max(...data.felhasznalok.map(u => u.felhasznalo_id)) + 1,
    nev: felhasznalonev,
    email: email,
    jelszo: jelszo,
    szerepkor_id: 1
  }
  data.felhasznalok.push(new_user);
}

// 🔥 VISSZATÉR TRUE/FALSE ELLEnŐRZÉSHEZ
export function login(jelszo , email){

  const found = data.felhasznalok.find(
    (e) => e.email === email && e.jelszo === jelszo
  );

  if(found){
    console.log("sikeres bejelentkezés");
    return true;   // <<< EZT FIGYELI A LOGIN.JSX
  }

  console.log("helytelen jelszó vagy felhasználónév");
  return false;
}
