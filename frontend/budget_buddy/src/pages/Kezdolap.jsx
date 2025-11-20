import logo from "../img/logo.png"
import login from "../img/login.png"
import registration from "../img/registration.png"


export function Kezdolap() {
  return(
    <div className="fooldal_div">

      <div className="fejlec_logo">
        <img src={logo} alt="logo" id="fooladl_logo" />
      </div>

      <div className="fejlec_gombok">
        <button className="fooldal_gomb">
          <img src={registration} alt="" />
          Regisztráció
        </button>

        <button className="fooldal_gomb" id="bejelentkezes">
          <img src={login} alt="" />
          Bejelentkezés
        </button>
      </div>

    </div>
  )
}
