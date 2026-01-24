import "./CelKartya.css"
import kuka from "../img/kuka_icon.png"

function formatFt(value) {
    const number = Number(value) || 0
    return `${number.toLocaleString("hu-HU")} Ft`
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

function getMonthsLeft(deadline) {
    const end = parseDate(deadline)
    if (!end) {
        return 0
    }

    const now = new Date()
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endMonth = new Date(end.getFullYear(), end.getMonth(), 1)
    const diffMonths =
        (endMonth.getFullYear() - startMonth.getFullYear()) * 12 +
        (endMonth.getMonth() - startMonth.getMonth())
    return Math.max(1, diffMonths + 1)
}

export default function CelKartya({
    name,
    current,
    target,
    deadline,
    onAdd,
    onDelete,
}) {
    const safeCurrent = Number(current) || 0
    const safeTarget = Number(target) || 0
    const monthsLeft = getMonthsLeft(deadline)
    const monthly =
        safeTarget > 0 && monthsLeft > 0
            ? Math.ceil(safeTarget / monthsLeft)
            : 0
    const progress =
        safeTarget > 0
            ? Math.min(100, Math.round((safeCurrent / safeTarget) * 100))
            : 0

    return (
        <div className="cel-kartya">
            <div className="cel-kartya-header">
                <div className="cel-kartya-title">{name || "Cél"}</div>
                <div className="cel-kartya-monthly">
                    {formatFt(monthly)} / hó
                </div>
            </div>
            <div className="cel-kartya-amount">
                {formatFt(safeCurrent)} / {formatFt(safeTarget)}
            </div>
            <div className="cel-kartya-progress">
                <span style={{ width: `${progress}%` }} />
            </div>
            <div className="cel-kartya-actions">
                <button
                    className="cel-kartya-btn"
                    type="button"
                    onClick={() => {
                        if (onAdd) {
                            onAdd(monthly)
                        }
                    }}
                >
                    Hozzáadás
                </button>
                <button
                    className="cel-kartya-btn cel-kartya-btn-danger"
                    type="button"
                    onClick={() => {
                        if (onDelete) {
                            onDelete()
                        }
                    }}
                >
                    <img src={kuka} alt="Törlés" className="cel-kartya-icon" />
                    Törlés
                </button>
            </div>
        </div>
    )
}
