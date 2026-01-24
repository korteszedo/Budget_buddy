import './register.css'
import userInterface from "../../img/user-interface.png"
import back_arrow from "../../img/back-arrow.png"
import { useRef, useState } from "react";
import { Login } from '../login/Login';
import { useNavigate } from "react-router-dom";
import { login, register } from "../../fetch";


export function Register({nyit_zar_register}){
    const [loginshow, setLoginshow] = useState(false)
    const navigate = useNavigate()

    const emailInput = useRef();
    const passInput = useRef();
    const usernameInput = useRef()


    function handleClick(){

        let email = emailInput.current.value;
        let username = usernameInput.current.value;
        let jelszo = passInput.current.value;

        register(username, email, jelszo).then((data) => {
            const rawUserId = data?.userId;
            const userId = typeof rawUserId === "string" ? Number(rawUserId) : rawUserId;
            if (!userId) {
                return null;
            }
            return login(email, jelszo);
        }).then((data) => {
            if (data && data.token) {
                localStorage.setItem("token", data.token);
                const rawRoleId = data.szerepkor_id ?? data.role_id ?? data.roleId;
                const roleId = typeof rawRoleId === "string" ? Number(rawRoleId) : rawRoleId;
                navigate(roleId === 2 ? "/admin" : "/fooldal")
            }
        });
    }


    return(
        <div className='register-box'>
            
            
                <div>
                    <div className="register-header">
                        <button className="register_back-btn" onClick={nyit_zar_register}>
                            <img src={back_arrow} alt="Vissza" className="back-arrow" />
                        </button>
                    </div>
    
                    <div className="register-content">
                        <img src={userInterface} alt="Felhasználó" className="user-icon" />
                        <input type="text" placeholder="Email cím" ref={emailInput} className="input" />
                        <input type="text" placeholder="Felhasználónév" ref={usernameInput} className="input" />
                        <input type="password" placeholder="Jelszó" ref={passInput} className="input" />
    
                        <button className="register-button" onClick={handleClick}>
                          Regisztráció
                        </button>
    
                        <p className="login-account" onClick={()=> setLoginshow(true)}>
                            Már van fiókod?
                        </p>
                    </div>
                </div>
           
    
            {loginshow && (
                <Login nyit_zar={() => setLoginshow(false)} />
            )}
        </div>
    );
}
