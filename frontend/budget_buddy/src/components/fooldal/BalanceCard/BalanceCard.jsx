import "./BalanceCard.css"
import { useEffect, useState } from "react"
import { getBalance } from "../../../fetch"

function formatFt(value) {
    const number = Number(value) || 0
    return `${number.toLocaleString("hu-HU")} Ft`
}

export default function BalanceCard() {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        function loadBalance() {
            const token = localStorage.getItem("token")
            if (!token) {
                setBalance(0)
                return
            }

            getBalance(token).then((data) => {
                setBalance((data && data.egyenleg) || 0)
            })
        }

        function handleUpdated() {
            loadBalance()
        }

        loadBalance()
        window.addEventListener("transactions:updated", handleUpdated)
        return () => {
            window.removeEventListener("transactions:updated", handleUpdated)
        }
    }, [])

    return (
        <div className="fooldal-card fooldal-card-balance">
            <div className="fooldal-card-title">Egyenleg</div>
            <div className="fooldal-card-subtitle">
                Az elérhető egyenleged a számládon
            </div>
            <div className="fooldal-balance-value">{formatFt(balance)}</div>
            <div className="fooldal-balance-note">
                Kövesd számon a pénzügyeid, hogy elérd céljaid.
            </div>
        </div>
    )
}
