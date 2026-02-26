import "./NewTransactionModal.css"
import { useRef, useState } from "react"
import { addTransaction } from "../../../fetch"

import logo from "../../../img/logo.png"
import backArrow from "../../../img/back-arrow.png"

const MAX_CATEGORY_LENGTH = 30
const MAX_AMOUNT = 100000000

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

        const category = categoryRef.current.value.trim()
        if (!category) {
            alert("Add meg a kategoriat.")
            return
        }
        if (category.length > MAX_CATEGORY_LENGTH) {
            alert("A kategoria tul hosszu.")
            return
        }

        const amountValue = Number(amountRef.current.value)
        if (!Number.isFinite(amountValue) || amountValue <= 0) {
            alert("Adj meg ervenyes osszeget.")
            return
        }
        if (amountValue > MAX_AMOUNT) {
            alert("Az osszeg tul nagy.")
            return
        }
        const amount = amountValue
        const dateValue = dateRef.current.value
        const date =
            dateValue && dateValue.trim()
                ? dateValue
                : new Date().toISOString().slice(0, 10)

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
                    min="1"
                    max={MAX_AMOUNT}
                    placeholder="Összeg"
                    ref={amountRef}
                />
                <input
                    className="transaction-input"
                    type="text"
                    maxLength={MAX_CATEGORY_LENGTH}
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
