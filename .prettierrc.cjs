// @ts-check

/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: false,
  printWidth: 100,
  arrowParens: "always",
  semi: false,
  tabWidth: 2,
  trailingComma: "all",

  plugins: [require("@trivago/prettier-plugin-sort-imports")],
  // trivago/prettier-plugin-sort-imports
  importOrder: ["^@resembli/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
