import type { AnyObj, SetValue, SetupState } from "@/types"
import { extract } from "@/utils"

import { createStore } from "solid-js/store"

export function state<T extends AnyObj>(setup: SetupState<T>): T {
    const set = <K extends keyof T>(...args: [SetValue<Partial<T>, T>] | [K, SetValue<T[K]>]) => {
        // If `set` is called in the setup function instead of inside an action, the store will not
        // be initialized yet. In this case, do nothing.
        if (!setStore) {
            return
        }

        setStore((current) => {
            if (typeof args[0] === "object" || typeof args[0] === "function") {
                const value = extract(args[0], current)
                return { ...current, ...value }
            } else {
                const key = args[0]
                const value = extract(args[1] as SetValue<T[K]>, current[key])
                return { ...current, [key]: value }
            }
        })
    }

    const [store, setStore] = createStore(setup(set))

    return store
}
