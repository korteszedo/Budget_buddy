import "./navigacio.css"

import logo from "../../img/logo.png"
import home from "../../img/home.png"
import exit from "../../img/exit.png"
import { NavLink, Link, useNavigate } from "react-router-dom"

export default function Navigacio() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        navigate("/", { replace: true })
    }

    return (
        <nav className="nav">
            <ul className="nav-list">
                <li className="nav-item nav-logo">
                    <img src={logo} alt="Logó" />
                </li>

                <li className="nav-item nav-text">
                    <NavLink
                        to="/grafikonok"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Grafikonok
                    </NavLink>
                </li>

                <li className="nav-item nav-icon">
                    <Link to="/fooldal">
                        <img src={home} alt="Főoldal" />
                    </Link>
                </li>

                <li className="nav-item nav-text">
                    <NavLink
                        to="/tervek"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Tervek
                    </NavLink>
                </li>

                <li className="nav-item nav-icon">
                    <button
                        className="nav-logout"
                        type="button"
                        onClick={handleLogout}
                    >
                        <img src={exit} alt="Kilépés" className="exit" />
                    </button>
                </li>
            </ul>
        </nav>
    )
}
