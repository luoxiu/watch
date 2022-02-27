module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint",],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended",],
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "quote-props": ["error", "as-needed"],
  },
  env: {
    browser: true,
    node: true
  },
};