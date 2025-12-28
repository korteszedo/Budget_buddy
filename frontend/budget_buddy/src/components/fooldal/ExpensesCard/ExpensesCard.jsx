import "./ExpensesCard.css"
import { useEffect, useState } from "react"
import { getExpensesByCategory } from "../../../fetch"

function formatFt(value) {
    const number = Number(value) || 0
    return `${number.toLocaleString("hu-HU")} Ft`
}

export default function ExpensesCard() {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            return
        }

        getExpensesByCategory(userId).then((data) => {
            if (Array.isArray(data)) {
                setExpenses(data.slice(0, 4))
            } else {
                setExpenses([])
            }
        })
    }, [])

    return (
        <div className="fooldal-overview-card expenses-card">
            <div className="overview-title">Kiadasok</div>
            <div className="expenses-grid">
                {expenses.length === 0 ? (
                    <div className="fooldal-empty">Nincs adat</div>
                ) : (
                    expenses.map((item, index) => (
                        <div
                            className="expenses-item"
                            key={`${item.kategoria}-${index}`}
                        >
                            <span className="expenses-name">
                                {item.kategoria}
                            </span>
                            <span className="expenses-amount">
                                {formatFt(item.osszeg)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
