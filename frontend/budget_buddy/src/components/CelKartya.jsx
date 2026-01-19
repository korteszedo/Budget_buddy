import "./CelKartya.css"
import kuka from "../img/kuka_icon.png"

function formatFt(value) {
    const number = Number(value) || 0
    return `${number.toLocaleString("hu-HU")} Ft`
}

export default function CelKartya({ name, current, target }) {
    const safeCurrent = Number(current) || 0
    const safeTarget = Number(target) || 0
    const progress =
        safeTarget > 0
            ? Math.min(100, Math.round((safeCurrent / safeTarget) * 100))
            : 0

    return (
        <div className="cel-kartya">
            <div className="cel-kartya-title">{name || "Cel"}</div>
            <div className="cel-kartya-progress">
                <span style={{ width: `${progress}%` }} />
            </div>
            <div className="cel-kartya-amount">
                {formatFt(safeCurrent)} / {formatFt(safeTarget)}
            </div>
            <div className="cel-kartya-actions">
                <button className="cel-kartya-btn" type="button">
                    Hozzaadas
                </button>
                <button className="cel-kartya-btn cel-kartya-btn-danger" type="button">
                    <img src={kuka} />
                    Torles
                </button>
            </div>
        </div>
    )
}
