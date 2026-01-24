import "./TransactionsCard.css"
import { useEffect, useState } from "react"
import { getTransactionList } from "../../../fetch"

function formatSignedFt(value, tipus) {
    const safeNumber = Math.abs(Number(value) || 0)
    const sign = tipus === "bevetel" ? "+" : "-"
    return `${sign}${safeNumber.toLocaleString("hu-HU")} Ft`
}

export default function TransactionsCard() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        function loadTransactions() {
            const token = localStorage.getItem("token")
            if (!token) {
                setTransactions([])
                return
            }

            getTransactionList(token).then((data) => {
                if (Array.isArray(data)) {
                    setTransactions(data.slice(0, 3))
                } else {
                    setTransactions([])
                }
            })
        }

        function handleUpdated() {
            loadTransactions()
        }

        loadTransactions()
        window.addEventListener("transactions:updated", handleUpdated)
        return () => {
            window.removeEventListener("transactions:updated", handleUpdated)
        }
    }, [])

    return (
        <div className="fooldal-card fooldal-card-transactions">
            <div className="fooldal-card-title">Tranzakciók</div>
            <div className="fooldal-transactions">
                {transactions.length === 0 ? (
                    <div className="fooldal-empty">Nincs adat</div>
                ) : (
                    transactions.map((item, index) => {
                        const isIncome = item.tipus === "bevetel"

                        return (
                            <div
                                className="fooldal-transaction-item"
                                key={`${item.tipus}-${item.osszeg}-${index}`}
                            >
                                <span className="fooldal-transaction-label">
                                    {isIncome ? "Bevétel" : "Kiadás"}
                                </span>
                                <span
                                    className={`fooldal-transaction-amount ${
                                        isIncome ? "is-income" : "is-expense"
                                    }`}
                                >
                                    {formatSignedFt(item.osszeg, item.tipus)}
                                </span>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
