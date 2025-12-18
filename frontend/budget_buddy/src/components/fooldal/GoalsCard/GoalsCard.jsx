import "./GoalsCard.css"
import { useEffect, useState } from "react"
import { getGoals } from "../../../fetch"

function formatFt(value) {
    const number = Number(value)
    if (!Number.isFinite(number)) {
        return "0 Ft"
    }
    return `${number.toLocaleString("hu-HU")} Ft`
}

export default function GoalsCard() {
    const [goals, setGoals] = useState([])

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            return
        }

        getGoals(userId).then((data) => {
            setGoals(Array.isArray(data) ? data : [])
        })
    }, [])

    const items = goals.slice(0, 2)

    return (
        <div className="fooldal-overview-card goals-card">
            <div className="overview-title">Celok</div>
            <div className="goals-list">
                {items.length === 0 ? (
                    <div className="fooldal-empty">Nincs adat</div>
                ) : (
                    items.map((goal, index) => {
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
