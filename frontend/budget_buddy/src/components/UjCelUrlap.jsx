import "./UjCelUrlap.css"
import { useRef } from "react"
import { addGoal } from "../fetch"

import logo from "../img/logo.png"
import backArrow from "../img/back-arrow.png"

export function UjCelUrlap({ nyit_zar, onSuccess }) {
    const nameInput = useRef()
    const targetInput = useRef()
    const dateInput = useRef()

    function handleClick() {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        const name = nameInput.current.value.trim()
        const targetValue = Number(targetInput.current.value)
        const target = Number.isFinite(targetValue) ? targetValue : 0
        const deadline = dateInput.current.value

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
                    placeholder="Cél neve"
                    ref={nameInput}
                />
                <input
                    className="ujcel-input"
                    type="number"
                    step="1"
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
