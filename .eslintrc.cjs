// @ts-check

/** @type {import('eslint').Linter.Config}} */
module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "999.999.999", // https://github.com/yannickcr/eslint-plugin-react/issues/1955
    },
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",

    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],

    "react-hooks/exhaustive-deps": "error",
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.cjs"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
}
