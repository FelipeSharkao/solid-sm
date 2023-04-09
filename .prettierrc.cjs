module.exports = {
    printWidth: 100,
    tabWidth: 4,
    trailingComma: "all",
    singleQuote: false,
    semi: false,
    plugins: [
        require("@trivago/prettier-plugin-sort-imports"),
    ],
    importOrder: ["<THIRD_PARTY_MODULES>", "^@", ".*"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
}
