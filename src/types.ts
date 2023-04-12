export type AnyObj = Record<string, unknown>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunc = (...args: any) => unknown

export type SetupState<T extends AnyObj> = (set: StateSetter<T>) => T

export type StateSetter<T extends AnyObj> = {
    (value: SetValue<Partial<T>, T>): void
    <K extends keyof T>(key: K, value: SetValue<T[K]>): void
}

export type SetValue<T, U = T> = Exclude<T, AnyFunc> | ((value: U) => T)
