import "./login.css"
import { useRef, useState } from "react";

import userInterface from "../../img/user-interface.png"
import back_arrow from "../../img/back-arrow.png"

export function Login({ nyit_zar }) {
  const emailInput = useRef();
  const passInput = useRef();

  function handleClick() {
    console.log(emailInput.current.value);
    console.log(passInput.current.value);
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
        <input type="text" placeholder="Email cím" ref={emailInput} className="input" />
        <input type="password" placeholder="Jelszó" ref={passInput} className="input" />

        <button className="login-button" onClick={handleClick}>
          Bejelentkezés
        </button>

        <p className="no-account">Még nincs fiókod?</p>
      </div>

    </div>
  );
}
