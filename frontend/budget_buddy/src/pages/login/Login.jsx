import "./login.css"
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Register } from "../register/Register";
import { useNavigate } from "react-router-dom";
import { login } from "../../fetch";
import { validateLoginInputs, validationMessages } from "../validation";

import userInterface from "../../img/user-interface.png"
import back_arrow from "../../img/back-arrow.png"

const MAX_EMAIL_LENGTH = 100;
const MAX_PASSWORD_LENGTH = 64;

// login modal
export function Login({ nyit_zar }) {

  const navigate = useNavigate()

  // modal allapot
  const [registershow, setRegistershow] = useState(false)

  const emailInput = useRef();
  const passInput = useRef();

  // login kezeles
  function handleClick() {
    const emailEl = emailInput.current;
    const passEl = passInput.current;
    if (!emailEl || !passEl) {
      return;
    }

    const validationError = validateLoginInputs({
      email: emailEl.value,
      password: passEl.value,
      maxEmailLength: MAX_EMAIL_LENGTH,
      maxPasswordLength: MAX_PASSWORD_LENGTH,
    });
    if (validationError) {
      if (validationError === validationMessages.emailMissingAt) {
        emailEl.setCustomValidity("");
        alert(validationError);
        emailEl.setCustomValidity(validationMessages.emailMissingAt);
        emailEl.reportValidity();
      } else {
        alert(validationError);
      }
      return;
    }
    const email = emailEl.value.trim();
    const jelszo = passEl.value;

    login(email, jelszo).then((data) => {
      if (!data || !data.token) {
        const message = data?.message ?? "";
        if (message.toLowerCase().includes("hibas")) {
          alert("Helytelen email vagy jelszo.");
        } else {
          alert(message || "Sikertelen bejelentkezes.");
        }
        return;
      }
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        const userName =
          data.nev ?? data.name ?? data.username ?? data.userName ?? "";
        if (userName) {
          localStorage.setItem("userName", userName);
        }
        const rawRoleId = data.szerepkor_id ?? data.role_id ?? data.roleId;
        const roleId = typeof rawRoleId === "string" ? Number(rawRoleId) : rawRoleId;
        if (typeof roleId === "number" && !Number.isNaN(roleId)) {
          localStorage.setItem("roleId", String(roleId));
        }
        navigate(roleId === 2 ? "/admin" : "/fooldal")
      }
    });
  
  }

  return (
    <div className="login-box">

      <div className="login-header">
        <button className="back-btn" onClick={nyit_zar}>
          <img src={back_arrow} alt="Vissza" className="back-arrow" />
        </button>
      </div>

      <div className="login-content">
        <img src={userInterface} alt="FelhasznĂ„â€šĂ‹â€ˇlĂ„â€šÄąâ€š" className="user-icon" />

        <input 
          type="email" 
          placeholder="Email" 
          ref={emailInput} 
          className="input" 
          maxLength={MAX_EMAIL_LENGTH}
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />

        <input 
          type="password" 
          placeholder="Jelszó" 
          ref={passInput} 
          className="input" 
          maxLength={MAX_PASSWORD_LENGTH}
        />

        <button className="login-button" onClick={handleClick}>
          Bejelentkezés
        </button>

        <p className="no-account" onClick={() => setRegistershow(true)}>
          Még nincs fiókod?
        </p>
      </div>

      {registershow && (
        <Register nyit_zar_register={() => setRegistershow(false)} />
      )}

    </div>
  );
}
