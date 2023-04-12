import type { AnyFunc, AnyObj } from "@/types"

import type { Accessor } from "solid-js"

/**
 * Returns an array of actions from the given state.
 *
 * @param state The state to get the actions from.
 * @param keys The keys of the actions to get.
 * @returns An array of actions.
 * @example
 * const counterState = state((set) => ({
 *     count: 0,
 *     inc(): {
 *         set("count", (count) => count + 1)
 *     }
 * }))
 *
 * function Counter() {
 *     const [inc] = useActions(counterState, "inc")
 *
 *     return <button onClick={inc}>Increment</button>
 * }
 */
export function useActions<T extends AnyObj, const K extends readonly (keyof T)[]>(
    state: T | Accessor<T>,
    ...keys: K
): { [I in keyof K]: T[K[I]] extends infer A ? (A extends AnyFunc ? A : () => A) : never } {
    return keys.map((key) => {
        const action = (...args: unknown[]) => {
            const stateObject = typeof state === "function" ? state() : state
            const value = stateObject[key]

            if (typeof value === "function") {
                return value(...args)
            }

            return value
        }

        return action
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any
}
