import "./BalanceCard.css"
import { useEffect, useState } from "react"
import { getBalance } from "../../../fetch"

function formatFt(value) {
    const number = Number(value)
    if (!Number.isFinite(number)) {
        return "0 Ft"
    }
    return `${number.toLocaleString("hu-HU")} Ft`
}

export default function BalanceCard() {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            return
        }

        getBalance(userId).then((data) => {
            const nextBalance =
                data && typeof data.egyenleg !== "undefined"
                    ? data.egyenleg
                    : 0
            setBalance(nextBalance)
        })
    }, [])

    return (
        <div className="fooldal-card fooldal-card-balance">
            <div className="fooldal-card-title">Egyenleg</div>
            <div className="fooldal-card-subtitle">
                Az elerheto egyenleged a szamladon
            </div>
            <div className="fooldal-balance-value">{formatFt(balance)}</div>
            <div className="fooldal-balance-note">
                Kovesd szamon a penzugyeid, hogy elerd celjaid.
            </div>
        </div>
    )
}
