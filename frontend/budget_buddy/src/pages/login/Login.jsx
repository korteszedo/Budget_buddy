import "./login.css"
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Register } from "../register/Register";
import { useNavigate } from "react-router-dom";
import { login } from "../../fetch";

import userInterface from "../../img/user-interface.png"
import back_arrow from "../../img/back-arrow.png"

export function Login({ nyit_zar, onSuccess }) {

  const navigate = useNavigate()

  const [registershow, setRegistershow] = useState(false)

  const emailInput = useRef();
  const passInput = useRef();

  function handleClick() {
    const email = emailInput.current.value;
    const jelszo = passInput.current.value;

    login(email, jelszo).then((data) => {
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        const rawRoleId = data.szerepkor_id ?? data.role_id ?? data.roleId;
        const roleId = typeof rawRoleId === "string" ? Number(rawRoleId) : rawRoleId;
        navigate(roleId === 2 ? "/admin" : "/fooldal")
      }
    });
  
  }

  return (
    <div className="login-box">

      <div className="login-header">
        <button className="back-btn" onClick={nyit_zar}>
          <img src={back_arrow} alt="" className="back-arrow" />
        </button>
      </div>

      <div className="login-content">
        <img src={userInterface} alt="" className="user-icon" />

        <input 
          type="text" 
          placeholder="Email cím" 
          ref={emailInput} 
          className="input" 
        />

        <input 
          type="password" 
          placeholder="Jelszó" 
          ref={passInput} 
          className="input" 
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
