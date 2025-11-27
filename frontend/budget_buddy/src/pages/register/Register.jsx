import './register.css'
import userInterface from "../../img/user-interface.png"
import back_arrow from "../../img/back-arrow.png"
import { useRef, useState } from "react";
import { Login } from '../login/Login';


export function Register({nyit_zar_register}){
    const [loginshow, setLoginshow] = useState(false)

    const emailInput = useRef();
    const passInput = useRef();
    const usernameInput = useRef()


    function handleClick(){
        console.log(emailInput.current.value)
        console.log(usernameInput.current.value)
        console.log(passInput.current.value)
    }


    return(
        <div className='register-box'>
            
            {!loginshow && (
                <div>
                    <div className="register-header">
                        <button className="register_back-btn" onClick={nyit_zar_register}>
                            <img src={back_arrow} alt="" className="back-arrow" />
                        </button>
                    </div>
    
                    <div className="register-content">
                        <img src={userInterface} alt="" className="user-icon" />
                        <input type="text" placeholder="Email cím" ref={emailInput} className="input" />
                        <input type="text" placeholder="Felhasználónév" ref={usernameInput} className="input" />
                        <input type="password" placeholder="Jelszó" ref={passInput} className="input" />
    
                        <button className="register-button" onClick={handleClick}>
                          Regisztráció
                        </button>
    
                        <p className="login-account" onClick={()=> setLoginshow(true)}>
                            Már felhasználó vagy?
                        </p>
                    </div>
                </div>
            )}
    
            {loginshow && (
                <Login nyit_zar={() => setLoginshow(false)} />
            )}
        </div>
    );
}



