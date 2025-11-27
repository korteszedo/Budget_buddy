import "./login.css"
import { login } from "../../functions/registration";
import { useRef, useState } from "react";
import { Register } from "../register/Register";

import userInterface from "../../img/user-interface.png"
import back_arrow from "../../img/back-arrow.png"

export function Login({ nyit_zar, onSuccess }) {

  const [registershow, setRegistershow] = useState(false)

  const emailInput = useRef();
  const passInput = useRef();

  function handleClick() {
    const email = emailInput.current.value;
    const jelszo = passInput.current.value;

    const sikeres = login(jelszo, email);

    if (sikeres) {
      onSuccess();
    }
    else{
      alert("Bejelentkezés Sikertelen")
    }
    
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
