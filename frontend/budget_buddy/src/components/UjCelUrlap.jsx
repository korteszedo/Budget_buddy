import "./UjCelUrlap.css"
import { useRef } from "react"
import { addGoal } from "../fetch"

import logo from "../img/logo.png"
import backArrow from "../img/back-arrow.png"

const MAX_GOAL_NAME_LENGTH = 50
const MAX_TARGET_AMOUNT = 100000000

// uj cel modal
export function UjCelUrlap({ nyit_zar, onSuccess }) {
    const nameInput = useRef()
    const targetInput = useRef()
    const dateInput = useRef()

    // cel mentes
    function handleClick() {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        const name = nameInput.current.value.trim()
        if (!name) {
            alert("Add meg a cel nevet.")
            return
        }
        if (name.length > MAX_GOAL_NAME_LENGTH) {
            alert("A cel neve tul hosszu.")
            return
        }

        const targetValue = Number(targetInput.current.value)
        if (!Number.isFinite(targetValue) || targetValue <= 0) {
            alert("Adj meg ervenyes celosszeget.")
            return
        }
        if (targetValue > MAX_TARGET_AMOUNT) {
            alert("A celosszeg tul nagy.")
            return
        }
        const target = targetValue
        const deadline = dateInput.current.value
        if (!deadline) {
            alert("Add meg a hataridot.")
            return
        }

        addGoal(token, name, target, 0, deadline).then(() => {
            if (onSuccess) {
                onSuccess()
            }
            if (nyit_zar) {
                nyit_zar()
            }
        })
    }

    return (
        <div className="ujcel-box">
            <div className="ujcel-header">
                <img src={logo} alt="Budget Buddy" className="ujcel-logo" />
                <button
                    className="ujcel-close"
                    type="button"
                    onClick={() => {
                        if (nyit_zar) {
                            nyit_zar()
                        }
                    }}
                >
                    <img src={backArrow} alt="Vissza" />
                </button>
            </div>

            <div className="ujcel-title">Új cél</div>

            <div className="ujcel-form">
                <input
                    className="ujcel-input"
                    type="text"
                    maxLength={MAX_GOAL_NAME_LENGTH}
                    placeholder="Cél neve"
                    ref={nameInput}
                />
                <input
                    className="ujcel-input"
                    type="number"
                    step="1"
                    min="1"
                    max={MAX_TARGET_AMOUNT}
                    placeholder="Célösszeg"
                    ref={targetInput}
                />
                <input
                    className="ujcel-input"
                    type="date"
                    placeholder="Határidő"
                    ref={dateInput}
                />

                <button className="ujcel-submit" type="button" onClick={handleClick}>
                    Hozzáadás
                </button>
            </div>
        </div>
    )
}
