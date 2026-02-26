import './register.css'
import userInterface from "../../img/user-interface.png"
import back_arrow from "../../img/back-arrow.png"
import { useRef, useState } from "react";
import { Login } from '../login/Login';
import { useNavigate } from "react-router-dom";
import { login, register } from "../../fetch";
import { validateRegisterInputs, validationMessages } from "../validation";

const MAX_EMAIL_LENGTH = 100;
const MAX_USERNAME_LENGTH = 30;
const MAX_PASSWORD_LENGTH = 64;


export function Register({nyit_zar_register}){
    const [loginshow, setLoginshow] = useState(false)
    const navigate = useNavigate()

    const emailInput = useRef();
    const passInput = useRef();
    const usernameInput = useRef()


    function handleClick(){

        const emailEl = emailInput.current;
        const passEl = passInput.current;
        const usernameEl = usernameInput.current;
        if (!emailEl || !passEl || !usernameEl) {
            return;
        }

        const validationError = validateRegisterInputs({
            email: emailEl.value,
            username: usernameEl.value,
            password: passEl.value,
            maxEmailLength: MAX_EMAIL_LENGTH,
            maxUsernameLength: MAX_USERNAME_LENGTH,
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
        let email = emailEl.value.trim();
        let username = usernameEl.value.trim();
        let jelszo = passEl.value;

        register(username, email, jelszo).then((data) => {
            const rawUserId = data?.userId;
            const userId = typeof rawUserId === "string" ? Number(rawUserId) : rawUserId;
            if (!userId) {
                alert("Az email cim mar foglalt.");
                return null;
            }
            alert("Sikeres regisztracio.");
            return login(email, jelszo);
        }).then((data) => {
            if (!data || !data.token) {
                const message = data?.message ?? "";
                if (message.toLowerCase().includes("hibas")) {
                    alert("Helytelen email vagy jelszo.");
                } else if (message) {
                    alert(message);
                } else {
                    alert("A bejelentkezes nem sikerult.");
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


    return(
        <div className='register-box'>
            
            
                <div>
                    <div className="register-header">
                        <button className="register_back-btn" onClick={nyit_zar_register}>
                            <img src={back_arrow} alt="Vissza" className="back-arrow" />
                        </button>
                    </div>
    
                    <div className="register-content">
                        <img src={userInterface} alt="FelhasznĂ„â€šĂ‹â€ˇlĂ„â€šÄąâ€š" className="user-icon" />
                        <input type="email" placeholder="Email cĂ„â€šĂ‚Â­m" ref={emailInput} className="input" maxLength={MAX_EMAIL_LENGTH} onInput={(e) => e.currentTarget.setCustomValidity("")} />
                        <input type="text" placeholder="FelhasznĂ„â€šĂ‹â€ˇlĂ„â€šÄąâ€šnĂ„â€šĂ‚Â©v" ref={usernameInput} className="input" maxLength={MAX_USERNAME_LENGTH} />
                        <input type="password" placeholder="JelszĂ„â€šÄąâ€š" ref={passInput} className="input" maxLength={MAX_PASSWORD_LENGTH} />
    
                        <button className="register-button" onClick={handleClick}>
                          RegisztrĂ„â€šĂ‹â€ˇciĂ„â€šÄąâ€š
                        </button>
    
                        <p className="login-account" onClick={()=> setLoginshow(true)}>
                            MĂ„â€šĂ‹â€ˇr van fiĂ„â€šÄąâ€škod?
                        </p>
                    </div>
                </div>
           
    
            {loginshow && (
                <Login nyit_zar={() => setLoginshow(false)} />
            )}
        </div>
    );
}

