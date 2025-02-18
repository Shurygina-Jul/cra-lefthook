import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(compat.extends("eslint-config-react-app", "airbnb")),
  {
    rules: {
      quotes: ["warn", "double"],
      "react/react-in-jsx-scope": ["off"],
      "import/no-unresolved": ["warn"],
      "import/extensions": ["warn"],
      "import/prefer-default-export": ["off"],

      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: [".jsx", ".tsx"],
        },
      ],

      "react/jsx-props-no-spreading": ["warn"],
      "react/require-default-props": ["warn"],
      "react/forbid-prop-types": ["warn"],
      "react/no-array-index-key": ["warn"],
      "react/button-has-type": ["warn"],
      "jsx-a11y/click-events-have-key-events": ["warn"],
      "jsx-a11y/no-static-element-interactions": ["warn"],
      "jsx-a11y/anchor-is-valid": ["warn"],
      "no-unused-vars": ["warn"],
      "no-console": ["off"],
      "no-param-reassign": ["warn"],
      "no-shadow": ["warn"],
      "no-underscore-dangle": ["warn"],
      "no-nested-ternary": ["warn"],
      "no-restricted-syntax": ["warn"],
      "no-plusplus": ["warn"],
      "no-use-before-define": ["warn"],
      "no-unused-expressions": ["warn"],
      "no-multi-spaces": ["warn"],
      "no-trailing-spaces": ["warn"],
      "no-multiple-empty-lines": ["warn"],
      "object-curly-newline": ["warn"],
      "object-curly-spacing": ["warn", "always"],
      "array-bracket-spacing": ["warn", "always"],
      "comma-dangle": ["warn", "always-multiline"],
      "arrow-parens": ["warn", "always"],
      "arrow-body-style": ["warn", "as-needed"],
      "prefer-const": ["warn"],
      "prefer-template": ["warn"],
      "prefer-arrow-callback": ["warn"],
      "prefer-destructuring": ["warn"],
      semi: ["warn"],
      "block-spacing": "warn",
      "brace-style": "warn",
      "key-spacing": "warn",
      "comma-spacing": "warn",
      indent: "warn",
      "object-property-newline": "warn",
      "keyword-spacing": "warn",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],

    rules: {
      semi: ["warn"],
      "block-spacing": "warn",
      "brace-style": "warn",
      "key-spacing": "warn",
      "comma-spacing": "warn",
      indent: "warn",
      "object-property-newline": "warn",
      "keyword-spacing": "warn",
    },
  },
];
