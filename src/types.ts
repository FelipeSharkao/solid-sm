export type AnyObj = Record<string, unknown>
export type AnyFunc = (...args: unknown[]) => unknown

export type SetupState<T extends AnyObj> = (set: StateSetter<T>) => T

export type StateSetter<T extends AnyObj> = {
    (value: SetValue<Partial<T>, T>): void
    <K extends keyof T>(key: K, value: SetValue<T[K]>): void
}

export type SetValue<T, U = T> = Exclude<T, AnyFunc> | ((value: U) => T)
