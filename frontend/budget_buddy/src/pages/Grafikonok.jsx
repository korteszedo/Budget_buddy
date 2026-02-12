import "./grafikonok.css"
import Navigacio from "../components/navigacio/Navigacio"
import { useEffect, useMemo, useRef, useState } from "react"
import Chart from "chart.js/auto"
import { getTransactionList } from "../fetch"
import { RANGE_OPTIONS, buildSeries, sum } from "./utils"
const COLORS = { income: "#4caf50", expense: "#d65555", line: "#1f4f9c" }
const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
}
const axis = () => ({
    ticks: { color: "#1e1e1e", font: { size: 9 } },
    grid: { color: "rgba(0,0,0,0.1)" },
})
const withAxes = () => ({
    ...baseOptions,
    scales: { x: axis(), y: { ...axis(), beginAtZero: true } },
})
export default function Grafikonok() {
    const [transactions, setTransactions] = useState([])
    const [range, setRange] = useState("havi")
    const barCanvasRef = useRef(null)
    const lineCanvasRef = useRef(null)
    const pieCanvasRef = useRef(null)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }
        getTransactionList(token).then((data) => {
            setTransactions(Array.isArray(data) ? data : [])
        })
    }, [])
    const series = useMemo(
        () => buildSeries(transactions, range),
        [transactions, range]
    )
    const totalIncome = sum(series.income)
    const totalExpense = sum(series.expense)
    useEffect(() => {
        const canvas = barCanvasRef.current
        if (!canvas) return
        const chart = new Chart(canvas, {
            type: "bar",
            data: {
                labels: series.labels,
                datasets: [
                    {
                        label: "Bevetel",
                        data: series.income,
                        backgroundColor: COLORS.income,
                        borderRadius: 4,
                    },
                    {
                        label: "Kiadas",
                        data: series.expense,
                        backgroundColor: COLORS.expense,
                        borderRadius: 4,
                    },
                ],
            },
            options: withAxes(),
        })
        return () => chart.destroy()
    }, [barCanvasRef, series])

    useEffect(() => {
        const canvas = lineCanvasRef.current
        if (!canvas) return
        const chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: series.labels,
                datasets: [
                    {
                        label: "Koltseg",
                        data: series.expense,
                        borderColor: COLORS.line,
                        backgroundColor: "rgba(31, 79, 156, 0.2)",
                        tension: 0.3,
                        fill: true,
                        pointRadius: 3,
                    },
                ],
            },
            options: withAxes(),
        })
        return () => chart.destroy()
    }, [lineCanvasRef, series])

    useEffect(() => {
        const canvas = pieCanvasRef.current
        if (!canvas) return
        const chart = new Chart(canvas, {
            type: "pie",
            data: {
                labels: ["Kiadas", "Bevetel"],
                datasets: [
                    {
                        data: [totalExpense, totalIncome],
                        backgroundColor: [COLORS.expense, COLORS.income],
                        borderColor: "#ffffff",
                        borderWidth: 1,
                    },
                ],
            },
            options: baseOptions,
        })
        return () => chart.destroy()
    }, [pieCanvasRef, totalExpense, totalIncome])
    return (
        <div className="grafikonok-page">
            <Navigacio />
            <main className="grafikonok-main">
                <div className="grafikonok-title">Grafikonok</div>
                <section className="grafikonok-top">
                    <div className="grafikonok-card grafikonok-card-wide">
                        <div className="grafikonok-card-header">
                            <div className="grafikonok-card-title">
                                Kolteseid idoszak szerint
                            </div>
                            <div className="grafikonok-range">
                                {RANGE_OPTIONS.map((option) => (
                                    <button
                                        key={option.id}
                                        className={`grafikonok-range-btn ${
                                            range === option.id ? "is-active" : ""
                                        }`}
                                        type="button"
                                        onClick={() => setRange(option.id)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grafikonok-chart grafikonok-chart-large">
                            <canvas ref={barCanvasRef} />
                        </div>
                    </div>
                </section>
                <section className="grafikonok-grid">
                    <div className="grafikonok-card">
                        <div className="grafikonok-card-title">
                            Koltseg alakulasa
                        </div>
                        <div className="grafikonok-chart grafikonok-chart-small">
                            <canvas ref={lineCanvasRef} />
                        </div>
                    </div>
                    <div className="grafikonok-card grafikonok-card-pie">
                        <div className="grafikonok-card-title">
                            Kiadas es bevetel
                        </div>
                        <div className="grafikonok-chart grafikonok-chart-pie">
                            <canvas ref={pieCanvasRef} />
                        </div>
                    </div>
                </section>
                <div className="grafikonok-footer">
                    Erd el az anyagi fuggetlenseget
                </div>
            </main>
        </div>
    )
}
