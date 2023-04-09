import { state } from "@/state"

describe("state", () => {
    it("creates a state object", () => {
        type State = {
            value: number
        }

        const s = state<State>(() => ({
            value: 1,
        }))

        expect(s.value).toBe(1)
    })

    it("can be updated with actions", () => {
        type State = {
            value: number
            inc(): void
            dec(): void
        }

        const s = state<State>((set) => ({
            value: 1,
            inc() {
                set((state) => ({ value: state.value + 1 }))
            },
            dec() {
                set("value", (value) => value - 1)
            },
        }))

        expect(s.value).toBe(1)
        s.inc()
        expect(s.value).toBe(2)
        s.dec()
        expect(s.value).toBe(1)
    })

    it("can be nested without loving referential integrity", () => {
        type State = {
            nested: {
                value: number
                inc(): void
            }
        }

        const s = state<State>(() => ({
            nested: state((set) => ({
                value: 1,
                inc() {
                    set("value", (value) => value + 1)
                },
            })),
        }))

        expect(s.nested.value).toBe(1)
        const nested = s.nested
        s.nested.inc()
        expect(s.nested).toBe(nested)
        expect(s.nested.value).toBe(2)
    })
})
