import "./fooldal.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navigacio from "../../components/navigacio/Navigacio"
import BalanceCard from "../../components/fooldal/BalanceCard/BalanceCard"
import NewTransactionCard from "../../components/fooldal/NewTransactionCard/NewTransactionCard"
import TransactionsCard from "../../components/fooldal/TransactionsCard/TransactionsCard"
import ExpensesCard from "../../components/fooldal/ExpensesCard/ExpensesCard"
import GoalsCard from "../../components/fooldal/GoalsCard/GoalsCard"

export function Fooldal() {
    const navigate = useNavigate()
    const displayName = localStorage.getItem("userName") || "Vendég"

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/", { replace: true })
        }
    }, [navigate])

    return (
        <div className="fooldal-page">
            <Navigacio />

            <main className="fooldal-main">
                <div className="fooldal-title">Üdvözlünk {displayName}</div>

                <section className="fooldal-hero">
                    <BalanceCard />
                    <NewTransactionCard />
                    <TransactionsCard />
                </section>

                <div className="fooldal-section-title">Áttekintés</div>

                <section className="fooldal-overview">
                    <ExpensesCard />
                    <GoalsCard />
                </section>

                <div className="fooldal-footer">
                    Érd el az anyagi függetlenséget
                </div>
            </main>
        </div>
    )
}
