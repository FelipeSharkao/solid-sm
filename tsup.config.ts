import { spawn } from "child_process"
import { defineConfig } from "tsup"

export default defineConfig((options) => {
    const isDev = !!options.watch

    return {
        entry: { index: "src/index.ts" },
        format: "esm",
        target: "es5",
        splitting: true,
        dts: true,
        sourcemap: isDev,
        minify: !isDev,
        clean: !isDev,
        treeshake: !isDev && { preset: "safest" },
        onSuccess: async () => {
            if (isDev) {
                spawn("npm", ["run", "test"], { stdio: "inherit" })
            }
        },
    }
})
