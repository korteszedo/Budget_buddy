import "./tervek.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navigacio from "../components/navigacio/Navigacio"
import CelKartya from "../components/CelKartya"
import KamatSzamlaloPanel from "../components/KamatSzamlaloPanel"
import { UjCelUrlap } from "../components/UjCelUrlap"
import { deleteGoal, getGoals, updateGoal } from "../fetch"

export default function Tervek() {
    const [goals, setGoals] = useState([])
    const [showGoalModal, setShowGoalModal] = useState(false)
    const navigate = useNavigate()

    function getGoalId(goal) {
        return goal.cel_id ?? goal.goal_id ?? goal.id ?? null
    }

    function matchGoalById(goal, goalId) {
        const currentId = getGoalId(goal)
        if (currentId === null || goalId === null) {
            return false
        }
        return Number(currentId) === Number(goalId)
    }

    function getGoalCurrent(goal) {
        return Number(goal.aktualis ?? goal.aktualis_osszeg ?? 0) || 0
    }

    function getGoalTarget(goal) {
        return Number(goal.cel ?? goal.osszeg_cel ?? 0) || 0
    }

    function isGoalComplete(goal) {
        const target = getGoalTarget(goal)
        if (target <= 0) {
            return false
        }
        return getGoalCurrent(goal) >= target
    }

    function getGoalDeadline(goal) {
        return goal.hatarido ?? goal.deadline ?? goal.datum
    }

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

    const visibleGoals = goals.filter((goal) => !isGoalComplete(goal))
    const items = visibleGoals

    return (
        <div className="tervek-page">
            <Navigacio />

            <main className="tervek-main">
                <section className="tervek-hero">
                    <div className="tervek-hero-title">Érd el pénzügyi céljaid</div>
                    <div className="tervek-hero-text">
                        Tervezz előre, állíts be célokat, és kövesd az
                        előrehaladásod.
                    </div>
                    <button
                        className="tervek-hero-btn"
                        type="button"
                        onClick={() => setShowGoalModal(true)}
                    >
                        Hozzáad új célt
                    </button>
                </section>

                <section className="tervek-content">
                    <div className="tervek-goals-panel">
                        <div className="tervek-section-title">Célok</div>
                        <div className="tervek-goals-grid">
                            {items.length === 0 ? (
                                <div className="tervek-empty">Nincs adat</div>
                            ) : (
                                items.map((goal, index) => {
                                    const goalId = getGoalId(goal)
                                    const goalKey = goalId ?? `${goal.nev}-${index}`
                                    return (
                                        <CelKartya
                                            key={goalKey}
                                            name={goal.nev}
                                            current={getGoalCurrent(goal)}
                                            target={getGoalTarget(goal)}
                                            deadline={getGoalDeadline(goal)}
                                            onAdd={(amount) => {
                                                if (!amount) {
                                                    return
                                                }
                                                const token =
                                                    localStorage.getItem("token")
                                                const currentValue =
                                                    getGoalCurrent(goal)
                                                const updatedValue =
                                                    currentValue + amount
                                                if (!token || !goalId) {
                                                    setGoals((prev) =>
                                                        prev.map(
                                                            (item, itemIndex) =>
                                                                !goalId
                                                                    ? itemIndex ===
                                                                      index
                                                                        ? {
                                                                              ...item,
                                                                              aktualis:
                                                                                  updatedValue,
                                                                              aktualis_osszeg:
                                                                                  updatedValue,
                                                                          }
                                                                        : item
                                                                    : matchGoalById(
                                                                            item,
                                                                            goalId
                                                                        )
                                                                      ? {
                                                                            ...item,
                                                                            aktualis:
                                                                                updatedValue,
                                                                            aktualis_osszeg:
                                                                                updatedValue,
                                                                        }
                                                                      : item
                                                        )
                                                    )
                                                    return
                                                }

                                                updateGoal(
                                                    token,
                                                    goalId,
                                                    updatedValue
                                                ).then((data) => {
                                                    if (data && data.affected) {
                                                        setGoals((prev) =>
                                                            prev.map((item) =>
                                                                matchGoalById(
                                                                    item,
                                                                    goalId
                                                                )
                                                                    ? {
                                                                          ...item,
                                                                          aktualis:
                                                                              updatedValue,
                                                                          aktualis_osszeg:
                                                                              updatedValue,
                                                                      }
                                                                    : item
                                                            )
                                                        )
                                                        return
                                                    }
                                                    loadGoals()
                                                })
                                            }}
                                            onDelete={() => {
                                                const token =
                                                    localStorage.getItem("token")
                                                if (!token || !goalId) {
                                                    setGoals((prev) =>
                                                        prev.filter(
                                                            (item, itemIndex) =>
                                                                !goalId
                                                                    ? itemIndex !==
                                                                      index
                                                                    : !matchGoalById(
                                                                          item,
                                                                          goalId
                                                                      )
                                                        )
                                                    )
                                                    return
                                                }

                                                deleteGoal(token, goalId).then(
                                                    (data) => {
                                                        if (
                                                            data &&
                                                            data.affected
                                                        ) {
                                                            setGoals((prev) =>
                                                                prev.filter(
                                                                    (item) =>
                                                                        !matchGoalById(
                                                                            item,
                                                                            goalId
                                                                        )
                                                                )
                                                            )
                                                            return
                                                        }
                                                        loadGoals()
                                                    }
                                                )
                                            }}
                                        />
                                    )
                                })
                            )}
                        </div>
                    </div>

                    <div className="tervek-kamat-panel">
                        <KamatSzamlaloPanel />
                    </div>
                </section>

                <div className="tervek-footer">
                    Érd el az anyagi függetlenséget
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
