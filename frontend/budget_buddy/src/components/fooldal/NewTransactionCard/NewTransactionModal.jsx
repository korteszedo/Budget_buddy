import "./NewTransactionModal.css"
import { useRef, useState } from "react"
import { addTransaction } from "../../../fetch"

import logo from "../../../img/logo.png"
import backArrow from "../../../img/back-arrow.png"

export default function NewTransactionModal({ onClose, onSuccess }) {
    const [type, setType] = useState("kiadas")
    const amountRef = useRef()
    const categoryRef = useRef()
    const dateRef = useRef()

    function handleSubmit() {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        const amountValue = Number(amountRef.current.value)
        const amount = Number.isFinite(amountValue) ? amountValue : 0
        const category = categoryRef.current.value.trim()
        const dateValue = dateRef.current.value
        const date =
            dateValue && dateValue.trim()
                ? dateValue
                : new Date().toISOString().slice(0, 10)

        if (!category || amount <= 0) {
            return
        }

        addTransaction(token, type, amount, category, date).then((data) => {
            if (onSuccess) {
                onSuccess(data)
            }
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
                    Kiadás
                </button>
                <button
                    className={`transaction-type-btn ${
                        type === "bevetel" ? "is-active" : ""
                    }`}
                    type="button"
                    onClick={() => setType("bevetel")}
                >
                    Bevétel
                </button>
            </div>

            <div className="transaction-form">
                <input
                    className="transaction-input"
                    type="number"
                    step="1"
                    placeholder="Összeg"
                    ref={amountRef}
                />
                <input
                    className="transaction-input"
                    type="text"
                    placeholder="Kategória"
                    ref={categoryRef}
                />
                <input
                    className="transaction-input"
                    type="date"
                    placeholder="Dátum"
                    ref={dateRef}
                />
                <button
                    className="transaction-submit"
                    type="button"
                    onClick={handleSubmit}
                >
                    Hozzáadás
                </button>
            </div>
        </div>
    )
}
