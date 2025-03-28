import { FlatCompat } from "@eslint/eslintrc";

// Initialize FlatCompat with the required parameter
const compat = new FlatCompat({
  baseDirectory: __dirname, // Ensure the base directory is set correctly
});

module.exports = [
  ...compat.extends(
    "next",
    "next/core-web-vitals",
    "eslint:all",
    "plugin:react/all",
    "plugin:import/errors",
    "plugin:import/warnings"
  ),
  {
    env: {
      browser: true,
      es2020: true,
      node: true,
      jest: true,
    },
    globals: {
      "jest/globals": true, // Ensure Jest globals are recognized
    },
    settings: {
      jest: {
        version: 28, // Specify Jest version if needed
      },
    },
    testEnvironment: "jest-environment-jsdom", // Explicitly set the test environment
    parserOptions: {
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "never"],
      "func-style": 0,
      "max-len": 0,
      "no-magic-numbers": 0,
      "max-lines-per-function": 0,
      "space-before-function-paren": [
        "error",
        {
          anonymous: "never",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "function-call-argument-newline": 0,
      "padded-blocks": 0,
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
      "object-curly-spacing": ["error", "always"],
      "one-var": ["error", "never"],
      "quote-props": 0,
      "react/prop-types": 0,
      "react/jsx-indent": [2, 2],
      "react/jsx-indent-props": [2, 2],
      "react/jsx-filename-extension": 0,
      "react/react-in-jsx-scope": 0,
      "react/jsx-no-literals": 0,
      "react/jsx-one-expression-per-line": 0,
      "react/jsx-max-depth": 0,
      "react/jsx-newline": 0,
      "react/jsx-props-no-spreading": 0,
      "react/jsx-max-props-per-line": [
        "error",
        { maximum: { single: 3, multi: 1 } },
      ],
    },
    ignorePatterns: ["node_modules/", ".next/"],
    "settings": {
  "import/resolver": {
    "alias": [
        ["@/components", "./src/components"],
        ["@/classes", "./src/classes"]
    ]
  }
}

  },
];
