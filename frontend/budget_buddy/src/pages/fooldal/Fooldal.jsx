import "./fooldal.css"
import Navigacio from "../../components/navigacio/Navigacio"
import BalanceCard from "../../components/fooldal/BalanceCard/BalanceCard"
import NewTransactionCard from "../../components/fooldal/NewTransactionCard/NewTransactionCard"
import TransactionsCard from "../../components/fooldal/TransactionsCard/TransactionsCard"
import ExpensesCard from "../../components/fooldal/ExpensesCard/ExpensesCard"
import GoalsCard from "../../components/fooldal/GoalsCard/GoalsCard"

export function Fooldal() {
    const displayName = localStorage.getItem("userName") || "Alex"

    return (
        <div className="fooldal-page">
            <Navigacio />

            <main className="fooldal-main">
                <div className="fooldal-title">Udvozlunk {displayName}</div>

                <section className="fooldal-hero">
                    <BalanceCard />
                    <NewTransactionCard />
                    <TransactionsCard />
                </section>

                <div className="fooldal-section-title">Attekintes</div>

                <section className="fooldal-overview">
                    <ExpensesCard />
                    <GoalsCard />
                </section>

                <div className="fooldal-footer">
                    Erd el az anyagi fuggetlenseget
                </div>
            </main>
        </div>
    )
}
