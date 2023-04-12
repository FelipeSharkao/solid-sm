import { state } from "@/state"
import { useActions } from "@/useActions"

describe("useActions", () => {
    it("should return an array of actions from the given state", () => {
        const spy = jest.fn()

        const obj = state(() => ({
            foo(arg: string) {
                spy(arg)
            },
            bar(arg: number) {
                spy(arg)
            },
        }))

        const [foo, bar] = useActions(() => obj, "foo", "bar")

        foo("foo")
        expect(spy).toHaveBeenCalledWith("foo")

        bar(1)
        expect(spy).toHaveBeenCalledWith(1)
    })
})
