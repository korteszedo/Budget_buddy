import { describe, it, expect } from "vitest"
import { sum, parseAmount, formatDateLabel, buildSeries } from "./utils"

// sum tesztek
describe("sum", () => {
    // alap eset
    it("adds numbers", () => {
        expect(sum([1, 2, 3])).toBe(6)
    })

    // negativ eset
    it("handles negative values", () => {
        expect(sum([10, -4, -1])).toBe(5)
    })
})

// parse tesztek
describe("parseAmount", () => {
    // absz ertek
    it("parses numbers and returns absolute value", () => {
        expect(parseAmount("-12.5")).toBe(12.5)
    })

    // nulla eset
    it("handles zero", () => {
        expect(parseAmount(0)).toBe(0)
    })

    // hibas eset
    it("returns 0 for invalid input", () => {
        expect(parseAmount("nope")).toBe(0)
    })
})

// cimke tesztek
describe("formatDateLabel", () => {
    // nap cimke
    it("formats day labels as MM.DD", () => {
        const date = new Date(2024, 0, 5)
        expect(formatDateLabel(date, "day")).toBe("01.05")
    })

    // honap cimke
    it("formats month labels as YYYY-MM", () => {
        const date = new Date(2024, 9, 1)
        expect(formatDateLabel(date, "month")).toBe("2024-10")
    })

    // ev cimke
    it("formats year labels as YYYY", () => {
        const date = new Date(2024, 0, 1)
        expect(formatDateLabel(date, "year")).toBe("2024")
    })

    // rossz datum
    it("returns empty string for invalid date", () => {
        const bad = new Date("invalid")
        expect(formatDateLabel(bad, "day")).toBe("")
    })
})

// grafikon tesztek
describe("buildSeries", () => {
    // napi bucket
    it("groups transactions into the correct day bucket", () => {
        const now = new Date(2024, 0, 7)
        const transactions = [
            { datum: "2024-01-07", osszeg: "100", tipus: "bevetel" },
            { datum: "2024-01-07", osszeg: -50, tipus: "kiadas" },
        ]
        const result = buildSeries(transactions, "napi", now)
        expect(result.labels.length).toBe(7)
        expect(result.income[result.income.length - 1]).toBe(100)
        expect(result.expense[result.expense.length - 1]).toBe(50)
    })

    // hibas tartomany
    it("returns empty arrays for unknown range", () => {
        const result = buildSeries([], "unknown")
        expect(result.labels).toEqual([])
        expect(result.income).toEqual([])
        expect(result.expense).toEqual([])
    })

    // ures lista
    it("returns zero-filled arrays for empty transactions", () => {
        const now = new Date(2024, 0, 7)
        const result = buildSeries([], "napi", now)
        expect(result.labels.length).toBe(7)
        expect(result.income.every((value) => value === 0)).toBe(true)
        expect(result.expense.every((value) => value === 0)).toBe(true)
    })

    // hibas elemek
    it("ignores invalid items", () => {
        const now = new Date(2024, 0, 7)
        const transactions = [
            null,
            { datum: "invalid", osszeg: "10", tipus: "bevetel" },
        ]
        const result = buildSeries(transactions, "napi", now)
        expect(result.income.every((value) => value === 0)).toBe(true)
        expect(result.expense.every((value) => value === 0)).toBe(true)
    })
})
