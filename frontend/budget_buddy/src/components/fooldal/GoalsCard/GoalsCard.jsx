import "./GoalsCard.css"
import { useEffect, useState } from "react"
import { getGoals } from "../../../fetch"

function formatFt(value) {
    const number = Number(value) || 0
    return `${number.toLocaleString("hu-HU")} Ft`
}

export default function GoalsCard() {
    const [goals, setGoals] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        getGoals(token).then((data) => {
            if (Array.isArray(data)) {
                setGoals(data.slice(0, 2))
            } else {
                setGoals([])
            }
        })
    }, [])

    return (
        <div className="fooldal-overview-card goals-card">
            <div className="overview-title">Celok</div>
            <div className="goals-list">
                {goals.length === 0 ? (
                    <div className="fooldal-empty">Nincs adat</div>
                ) : (
                    goals.map((goal, index) => {
                        const current = Number(goal.aktualis) || 0
                        const target = Number(goal.cel) || 0
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
