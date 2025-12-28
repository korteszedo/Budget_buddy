import "./NewTransactionModal.css"
import { useRef, useState } from "react"
import { addTransaction } from "../../../fetch"

import logo from "../../../img/logo.png"
import backArrow from "../../../img/back-arrow.png"

export default function NewTransactionModal({ onClose }) {
    const [type, setType] = useState("kiadas")
    const amountRef = useRef()
    const categoryRef = useRef()
    const dateRef = useRef()

    function handleSubmit() {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            return
        }

        const amountValue = Number(amountRef.current.value)
        const amount = Number.isFinite(amountValue) ? amountValue : 0
        const category = categoryRef.current.value.trim()
        const dateValue = dateRef.current.value

        addTransaction(userId, type, amount, category, dateValue).then(() => {
            if (onClose) {
                onClose()
            }
        })
    }

    return (
        <div className="transaction-modal">
            <div className="transaction-header">
                <img src={logo} alt="Budget Buddy" className="transaction-logo" />
                <button
                    className="transaction-close"
                    type="button"
                    onClick={onClose}
                >
                    <img src={backArrow} alt="Vissza" />
                </button>
            </div>

            <div className="transaction-type">
                <button
                    className={`transaction-type-btn ${
                        type === "kiadas" ? "is-active" : ""
                    }`}
                    type="button"
                    onClick={() => setType("kiadas")}
                >
                    Kiadas
                </button>
                <button
                    className={`transaction-type-btn ${
                        type === "bevetel" ? "is-active" : ""
                    }`}
                    type="button"
                    onClick={() => setType("bevetel")}
                >
                    Bevetel
                </button>
            </div>

            <div className="transaction-form">
                <input
                    className="transaction-input"
                    type="number"
                    step="1"
                    placeholder="Osszeg"
                    ref={amountRef}
                />
                <input
                    className="transaction-input"
                    type="text"
                    placeholder="Kategoria"
                    ref={categoryRef}
                />
                <input
                    className="transaction-input"
                    type="date"
                    placeholder="Datum"
                    ref={dateRef}
                />
                <button
                    className="transaction-submit"
                    type="button"
                    onClick={handleSubmit}
                >
                    Hozzaadas
                </button>
            </div>
        </div>
    )
}
