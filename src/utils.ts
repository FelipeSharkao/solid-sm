import type { SetValue } from "./types"

export const extract = <T, U>(value: SetValue<T, U>, current: U) => {
    if (typeof value === "function") {
        const setter = value as (value: U) => T
        return setter(current)
    }
    return value
}
