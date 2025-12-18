import "./navigacio.css"

import logo from "../../img/logo.png"
import home from "../../img/home.png"
import exit from "../../img/exit.png"
import { NavLink, Link } from "react-router-dom"

export default function Navigacio(){
    return(
        <div>
            <ul>
                <li>
                    <img src={logo} alt="logo"/>
                </li>

                <li className="text">
                    <NavLink
                        to="/grafikonok"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Grafikonok
                    </NavLink>
                </li>

                <li>
                    <Link to="/fooldal">
                        <img src={home} alt="Home_icon"/>
                    </Link>
                </li>

                <li className="text">
                    <NavLink
                        to="/tervek"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Tervek
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/">
                        <img src={exit} alt="exit_logo" className="exit"/>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
