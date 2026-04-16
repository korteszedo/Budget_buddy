import "./GoalsCard.css"
import { useEffect, useState } from "react"
import { getGoals } from "../../../fetch"

// penz format
function formatFt(value) {
    const number = Number(value) || 0
    return `${number.toLocaleString("hu-HU")} Ft`
}

// aktualis ertek
function getGoalCurrent(goal) {
    return Number(goal.aktualis ?? goal.aktualis_osszeg ?? 0) || 0
}

// cel ertek
function getGoalTarget(goal) {
    return Number(goal.cel ?? goal.osszeg_cel ?? 0) || 0
}

// cel allapot
function isGoalComplete(goal) {
    const target = getGoalTarget(goal)
    if (!target) {
        return false
    }
    return getGoalCurrent(goal) >= target
}

// cel kartya
export default function GoalsCard() {
    const [goals, setGoals] = useState([])

    // adat toltes
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        getGoals(token).then((data) => {
            if (Array.isArray(data)) {
                const visibleGoals = data.filter((goal) => !isGoalComplete(goal))
                setGoals(visibleGoals.slice(0, 2))
            } else {
                setGoals([])
            }
        })
    }, [])

    return (
        <div className="fooldal-overview-card goals-card">
            <div className="overview-title">Célok</div>
            <div className="goals-list">
                {goals.length === 0 ? (
                    <div className="fooldal-empty">Nincs adat</div>
                ) : (
                    goals.map((goal, index) => {
                        const current = getGoalCurrent(goal)
                        const target = getGoalTarget(goal)
                        const progress =
                            target > 0
                                ? Math.min(
                                      100,
                                      Math.round((current / target) * 100)
                                  )
                                : 0

                        return (
                            <div
                                className="goal-item"
                                key={`${goal.nev}-${index}`}
                            >
                                <div className="goal-name">{goal.nev}</div>
                                <div className="goal-progress">
                                    <span style={{ width: `${progress}%` }} />
                                </div>
                                <div className="goal-amount">
                                    {formatFt(current)} / {formatFt(target)}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
