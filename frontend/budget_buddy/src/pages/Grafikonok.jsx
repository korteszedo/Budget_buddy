import "./grafikonok.css"
import Navigacio from "../components/navigacio/Navigacio"
import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Chart from "chart.js/auto"
import { getTransactionList } from "../fetch"

const RANGE_OPTIONS = [
    { id: "napi", label: "Napi", unit: "day", count: 7 },
    { id: "heti", label: "Heti", unit: "week", count: 8 },
    { id: "havi", label: "Havi", unit: "month", count: 12 },
    { id: "eves", label: "Eves", unit: "year", count: 5 },
]

function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function startOfWeek(date) {
    const dayIndex = (date.getDay() + 6) % 7
    const result = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - dayIndex
    )
    return startOfDay(result)
}

function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

function startOfYear(date) {
    return new Date(date.getFullYear(), 0, 1)
}

function formatDay(date) {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    return `${month}.${day}`
}

function formatMonth(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0")
    return `${date.getFullYear()}-${month}`
}

function formatYear(date) {
    return String(date.getFullYear())
}

function parseDate(value) {
    if (!value) {
        return null
    }

    if (typeof value === "string") {
        const clean = value.split("T")[0]
        const parts = clean.split("-")
        if (parts.length === 3) {
            const year = Number(parts[0])
            const month = Number(parts[1])
            const day = Number(parts[2])
            if (
                Number.isFinite(year) &&
                Number.isFinite(month) &&
                Number.isFinite(day)
            ) {
                return new Date(year, month - 1, day)
            }
        }
    }

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
        return null
    }
    return date
}

function createBuckets(option) {
    const now = new Date()
    const buckets = []

    for (let i = option.count - 1; i >= 0; i -= 1) {
        if (option.unit === "day") {
            const date = new Date(now)
            date.setDate(now.getDate() - i)
            const start = startOfDay(date)
            buckets.push({ key: start.getTime(), label: formatDay(start) })
        } else if (option.unit === "week") {
            const date = new Date(now)
            date.setDate(now.getDate() - i * 7)
            const start = startOfWeek(date)
            buckets.push({ key: start.getTime(), label: formatDay(start) })
        } else if (option.unit === "month") {
            const start = new Date(now.getFullYear(), now.getMonth() - i, 1)
            buckets.push({ key: start.getTime(), label: formatMonth(start) })
        } else {
            const start = new Date(now.getFullYear() - i, 0, 1)
            buckets.push({ key: start.getTime(), label: formatYear(start) })
        }
    }

    return buckets
}

function getBucketKey(date, unit) {
    if (unit === "day") {
        return startOfDay(date).getTime()
    }
    if (unit === "week") {
        return startOfWeek(date).getTime()
    }
    if (unit === "month") {
        return startOfMonth(date).getTime()
    }
    return startOfYear(date).getTime()
}

function buildSeries(transactions, rangeId) {
    const option = RANGE_OPTIONS.find((item) => item.id === rangeId)
    if (!option) {
        return { labels: [], income: [], expense: [] }
    }

    const buckets = createBuckets(option)
    const income = new Array(buckets.length).fill(0)
    const expense = new Array(buckets.length).fill(0)
    const bucketIndex = new Map(
        buckets.map((bucket, index) => [bucket.key, index])
    )

    transactions.forEach((item) => {
        const date = parseDate(item.datum)
        if (!date) {
            return
        }

        const key = getBucketKey(date, option.unit)
        const index = bucketIndex.get(key)
        if (typeof index !== "number") {
            return
        }

        const amount = Math.abs(Number(item.osszeg) || 0)
        if (item.tipus === "bevetel") {
            income[index] += amount
        } else {
            expense[index] += amount
        }
    })

    return {
        labels: buckets.map((bucket) => bucket.label),
        income,
        expense,
    }
}

export default function Grafikonok() {
    const [transactions, setTransactions] = useState([])
    const [range, setRange] = useState("napi")
    const navigate = useNavigate()

    const barCanvasRef = useRef(null)
    const lineCanvasRef = useRef(null)
    const pieCanvasRef = useRef(null)
    const barChartRef = useRef(null)
    const lineChartRef = useRef(null)
    const pieChartRef = useRef(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/", { replace: true })
            return
        }

        getTransactionList(token).then((data) => {
            setTransactions(Array.isArray(data) ? data : [])
        })
    }, [navigate])

    const series = useMemo(
        () => buildSeries(transactions, range),
        [transactions, range]
    )

    const totals = useMemo(() => {
        const totalIncome = series.income.reduce((sum, value) => sum + value, 0)
        const totalExpense = series.expense.reduce(
            (sum, value) => sum + value,
            0
        )
        return { totalIncome, totalExpense }
    }, [series])

    useEffect(() => {
        if (!barCanvasRef.current) {
            return
        }

        if (barChartRef.current) {
            barChartRef.current.destroy()
        }

        barChartRef.current = new Chart(barCanvasRef.current, {
            type: "bar",
            data: {
                labels: series.labels,
                datasets: [
                    {
                        label: "Bevetel",
                        data: series.income,
                        backgroundColor: "#4caf50",
                        borderRadius: 4,
                    },
                    {
                        label: "Kiadas",
                        data: series.expense,
                        backgroundColor: "#d65555",
                        borderRadius: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            color: "#1e1e1e",
                            boxWidth: 12,
                            font: { size: 10, weight: "600" },
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: { color: "#1e1e1e", font: { size: 9 } },
                        grid: { color: "rgba(0,0,0,0.1)" },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: "#1e1e1e", font: { size: 9 } },
                        grid: { color: "rgba(0,0,0,0.1)" },
                    },
                },
            },
        })

        return () => {
            if (barChartRef.current) {
                barChartRef.current.destroy()
                barChartRef.current = null
            }
        }
    }, [series])

    useEffect(() => {
        if (!lineCanvasRef.current) {
            return
        }

        if (lineChartRef.current) {
            lineChartRef.current.destroy()
        }

        lineChartRef.current = new Chart(lineCanvasRef.current, {
            type: "line",
            data: {
                labels: series.labels,
                datasets: [
                    {
                        label: "Koltseg",
                        data: series.expense,
                        borderColor: "#1f4f9c",
                        backgroundColor: "rgba(31, 79, 156, 0.2)",
                        tension: 0.3,
                        fill: true,
                        pointRadius: 3,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            color: "#1e1e1e",
                            boxWidth: 10,
                            font: { size: 10, weight: "600" },
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: { color: "#1e1e1e", font: { size: 9 } },
                        grid: { color: "rgba(0,0,0,0.1)" },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: "#1e1e1e", font: { size: 9 } },
                        grid: { color: "rgba(0,0,0,0.1)" },
                    },
                },
            },
        })

        return () => {
            if (lineChartRef.current) {
                lineChartRef.current.destroy()
                lineChartRef.current = null
            }
        }
    }, [series])

    useEffect(() => {
        if (!pieCanvasRef.current) {
            return
        }

        if (pieChartRef.current) {
            pieChartRef.current.destroy()
        }

        pieChartRef.current = new Chart(pieCanvasRef.current, {
            type: "pie",
            data: {
                labels: ["Kiadas", "Bevetel"],
                datasets: [
                    {
                        data: [totals.totalExpense, totals.totalIncome],
                        backgroundColor: ["#d65555", "#4caf50"],
                        borderColor: "#ffffff",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#1e1e1e",
                            boxWidth: 12,
                            font: { size: 10, weight: "600" },
                        },
                    },
                },
            },
        })

        return () => {
            if (pieChartRef.current) {
                pieChartRef.current.destroy()
                pieChartRef.current = null
            }
        }
    }, [totals])

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
                                            range === option.id
                                                ? "is-active"
                                                : ""
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
