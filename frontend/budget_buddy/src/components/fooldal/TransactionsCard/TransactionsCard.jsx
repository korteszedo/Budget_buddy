import "./TransactionsCard.css"
import { useEffect, useState } from "react"
import { getTransactionList } from "../../../fetch"

function formatSignedFt(value, tipus) {
    const number = Number(value)
    const safeNumber = Number.isFinite(number) ? Math.abs(number) : 0
    const sign = tipus === "bevetel" ? "+" : "-"
    return `${sign}${safeNumber.toLocaleString("hu-HU")} Ft`
}

export default function TransactionsCard() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            return
        }

        getTransactionList(userId).then((data) => {
            setTransactions(Array.isArray(data) ? data : [])
        })
    }, [])

    const recent = transactions.slice(0, 3)

    return (
        <div className="fooldal-card fooldal-card-transactions">
            <div className="fooldal-card-title">Tranzakciok</div>
            <div className="fooldal-transactions">
                {recent.length === 0 ? (
                    <div className="fooldal-empty">Nincs adat</div>
                ) : (
                    recent.map((item, index) => (
                        <div
                            className="fooldal-transaction-item"
                            key={`${item.tipus}-${item.osszeg}-${index}`}
                        >
                            <span className="fooldal-transaction-label">
                                {item.tipus === "bevetel"
                                    ? "Bevetel"
                                    : "Kiadas"}
                            </span>
                            <span
                                className={`fooldal-transaction-amount ${
                                    item.tipus === "bevetel"
                                        ? "is-income"
                                        : "is-expense"
                                }`}
                            >
                                {formatSignedFt(item.osszeg, item.tipus)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
