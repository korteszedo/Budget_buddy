import "./tervek.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navigacio from "../components/navigacio/Navigacio"
import CelKartya from "../components/CelKartya"
import KamatSzamlaloPanel from "../components/KamatSzamlaloPanel"
import { UjCelUrlap } from "../components/UjCelUrlap"
import { getGoals } from "../fetch"

export default function Tervek() {
    const [goals, setGoals] = useState([])
    const [showGoalModal, setShowGoalModal] = useState(false)
    const navigate = useNavigate()

    function loadGoals() {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        getGoals(token).then((data) => {
            setGoals(Array.isArray(data) ? data : [])
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/", { replace: true })
            return
        }

        loadGoals()
    }, [navigate])

    const items = goals.slice(0, 4)

    return (
        <div className="tervek-page">
            <Navigacio />

            <main className="tervek-main">
                <section className="tervek-hero">
                    <div className="tervek-hero-title">Erd el penzugyi celjaid</div>
                    <div className="tervek-hero-text">
                        Tervezz elore, allits be celokat, es koveted az
                        elorehaladasod.
                    </div>
                    <button
                        className="tervek-hero-btn"
                        type="button"
                        onClick={() => setShowGoalModal(true)}
                    >
                        Hozzaad uj celt
                    </button>
                </section>

                <section className="tervek-content">
                    <div className="tervek-goals-panel">
                        <div className="tervek-section-title">Celok</div>
                        <div className="tervek-goals-grid">
                            {items.length === 0 ? (
                                <div className="tervek-empty">Nincs adat</div>
                            ) : (
                                items.map((goal, index) => (
                                    <CelKartya
                                        key={`${goal.nev}-${index}`}
                                        name={goal.nev}
                                        current={goal.aktualis}
                                        target={goal.cel}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="tervek-kamat-panel">
                        <KamatSzamlaloPanel />
                    </div>
                </section>

                <div className="tervek-footer">
                    Erd el az anyagi fuggetlenseget
                </div>
            </main>

            {showGoalModal && (
                <UjCelUrlap
                    nyit_zar={() => setShowGoalModal(false)}
                    onSuccess={loadGoals}
                />
            )}
        </div>
    )
}
