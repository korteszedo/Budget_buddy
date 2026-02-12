export const RANGE_OPTIONS = [
    { id: "napi", label: "Napi", unit: "day", count: 7 },
    { id: "heti", label: "Heti", unit: "week", count: 8 },
    { id: "havi", label: "Havi", unit: "month", count: 12 },
    { id: "eves", label: "Eves", unit: "year", count: 5 },
]

export const sum = (values) => values.reduce((acc, value) => acc + value, 0)

export const parseAmount = (value) => {
    const numberValue = Number(value)
    if (!Number.isFinite(numberValue)) return 0
    return Math.abs(numberValue)
}

export const formatDateLabel = (date, unit) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return ""
    if (unit === "day" || unit === "week") {
        return `${String(date.getMonth() + 1).padStart(2, "0")}.${String(
            date.getDate()
        ).padStart(2, "0")}`
    }
    if (unit === "month") {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
        )}`
    }
    if (unit === "year") return String(date.getFullYear())
    return ""
}

const startOfDay = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate())

const startOfWeek = (date) => {
    const dayIndex = (date.getDay() + 6) % 7
    return startOfDay(
        new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayIndex)
    )
}

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1)
const startOfYear = (date) => new Date(date.getFullYear(), 0, 1)

const parseDate = (value) => {
    if (!value) return null
    if (typeof value === "string") {
        const [yearRaw, monthRaw, dayRaw] = value.split("T")[0].split("-")
        if (dayRaw) {
            const year = Number(yearRaw)
            const month = Number(monthRaw)
            const day = Number(dayRaw)
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
    return Number.isNaN(date.getTime()) ? null : date
}

const createBuckets = (option, now) => {
    const current = now instanceof Date ? now : new Date(now)
    const buckets = []
    for (let i = option.count - 1; i >= 0; i -= 1) {
        if (option.unit === "day") {
            const date = new Date(current)
            date.setDate(current.getDate() - i)
            const start = startOfDay(date)
            buckets.push({
                key: start.getTime(),
                label: formatDateLabel(start, "day"),
            })
        } else if (option.unit === "week") {
            const date = new Date(current)
            date.setDate(current.getDate() - i * 7)
            const start = startOfWeek(date)
            buckets.push({
                key: start.getTime(),
                label: formatDateLabel(start, "week"),
            })
        } else if (option.unit === "month") {
            const start = new Date(
                current.getFullYear(),
                current.getMonth() - i,
                1
            )
            buckets.push({
                key: start.getTime(),
                label: formatDateLabel(start, "month"),
            })
        } else {
            const start = new Date(current.getFullYear() - i, 0, 1)
            buckets.push({
                key: start.getTime(),
                label: formatDateLabel(start, "year"),
            })
        }
    }
    return buckets
}

const getBucketKey = (date, unit) => {
    if (unit === "day") return startOfDay(date).getTime()
    if (unit === "week") return startOfWeek(date).getTime()
    if (unit === "month") return startOfMonth(date).getTime()
    return startOfYear(date).getTime()
}

export const buildSeries = (transactions, rangeId, now = new Date()) => {
    const option = RANGE_OPTIONS.find((item) => item.id === rangeId)
    if (!option) return { labels: [], income: [], expense: [] }

    const buckets = createBuckets(option, now)
    const income = new Array(buckets.length).fill(0)
    const expense = new Array(buckets.length).fill(0)
    const bucketIndex = new Map(
        buckets.map((bucket, index) => [bucket.key, index])
    )

    transactions.forEach((item) => {
        if (!item) return
        const date = parseDate(item.datum)
        if (!date) return
        const index = bucketIndex.get(getBucketKey(date, option.unit))
        if (typeof index !== "number") return
        const amount = parseAmount(item.osszeg)
        if (item.tipus === "bevetel") income[index] += amount
        else expense[index] += amount
    })

    return { labels: buckets.map((bucket) => bucket.label), income, expense }
}
