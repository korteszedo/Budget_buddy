import "./NewTransactionCard.css"
import { useState } from "react"
import NewTransactionModal from "./NewTransactionModal"

export default function NewTransactionCard() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="fooldal-card fooldal-card-new">
            <div className="fooldal-card-title">Új tranzakció</div>
            <button
                className="fooldal-add-btn"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Hozzáad
            </button>
            {showModal && (
                <NewTransactionModal
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        window.dispatchEvent(
                            new CustomEvent("transactions:updated")
                        )
                    }}
                />
            )}
        </div>
    )
}
