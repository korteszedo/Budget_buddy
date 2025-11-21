import { useState } from 'react'

import logo from "../img/logo.png"
import login from "../img/login.png"
import test1 from "../img/test1.png"
import test2 from "../img/test2.png"
import test3 from "../img/test3.png"
import right_arrow from "../img/right-arrow.png"
import registration from "../img/registration.png"


export function Kezdolap() {

  const images = [test1, test2, test3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="container">
      <div className="fooldal_fejlec_div">

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

      <div className="content">

        <div id="tartalom_felso">
          <h1>Budget Buddy, aszisztens a spóroláshoz</h1>

          
            <img src={images[currentIndex]} alt="" className="hero_kep"/>

            <button onClick={nextImage} id="next_button">
              <img src={right_arrow} className="next_button_img" />
            </button>

          
        </div>

        <div id="boxes">
        <div className="box">
        <h3>Kiadások követése</h3>
        <p>
          Kövesd bevételeidet és kiadásaidat
          könnyen átlátható táblázatban és grafikonokon. 
          Lásd, mire megy el a pénzed!
        </p>
      </div>

      <div className="box">
        <h3>Befektetés és kamatszámítás</h3>
        <p>
          Használd a beépített kalkulátort, 
          hogy kiszámold a hitelek vagy befektetések hozamát és kamatait.
        </p>
      </div>

      <div className="box">
        <h3>Pénzügyi tervezés</h3>
        <p>
          Tűzz ki célokat, mint például egy nyaralás vagy új autó – és számold ki, mennyit kell havonta félretenned.
        </p>
      </div>
        </div>

        <h2>Érd el az anyagi függetlenséget</h2>

      </div>
    </div>
  );
}


