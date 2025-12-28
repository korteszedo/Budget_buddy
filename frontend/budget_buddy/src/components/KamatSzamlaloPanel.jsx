import "./KamatSzamlaloPanel.css"
import { useRef, useState } from "react"

function formatFt(value) {
    const number = Number(value) || 0
    return `${number.toLocaleString("hu-HU")} Ft`
}

export default function KamatSzamlaloPanel() {
    const amountRef = useRef()
    const rateRef = useRef()
    const [result, setResult] = useState(0)

    function handleCalculate() {
        const amountValue = Number(amountRef.current.value)
        const rateValue = Number(rateRef.current.value)
        const amount = Number.isFinite(amountValue) ? amountValue : 0
        const rate = Number.isFinite(rateValue) ? rateValue : 0

        const total = amount * (1 + rate / 100)
        setResult(total)
    }

    return (
        <div className="kamat-panel">
            <div className="kamat-title">Kamat</div>
            <div className="kamat-form">
                <input
                    className="kamat-input"
                    type="number"
                    step="1"
                    placeholder="Befektetett osszeg"
                    ref={amountRef}
                />
                <input
                    className="kamat-input"
                    type="number"
                    step="0.01"
                    placeholder="Kamatlab (%)"
                    ref={rateRef}
                />
                <div className="kamat-result">Vegosszeg: {formatFt(result)}</div>
                <button
                    className="kamat-button"
                    type="button"
                    onClick={handleCalculate}
                >
                    Szamolas
                </button>
            </div>
        </div>
    )
}
