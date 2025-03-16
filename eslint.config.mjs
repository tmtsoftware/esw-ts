import {fixupConfigRules, fixupPluginRules} from "@eslint/compat";
import prettier from "eslint-plugin-prettier";
import jest from "eslint-plugin-jest";
import _import from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import {fileURLToPath} from "node:url";
import js from "@eslint/js";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [{
  ignores: ["example/**/*"],
}, ...fixupConfigRules(compat.extends(
  "plugin:@typescript-eslint/recommended",
  "plugin:prettier/recommended",
  "plugin:react/recommended",
  "plugin:prettier/recommended",
  "plugin:jest/recommended",
  "plugin:import/errors",
  "plugin:import/warnings",
  "plugin:import/typescript",
)), {
  plugins: {
    prettier: fixupPluginRules(prettier),
    jest: fixupPluginRules(jest),
    import: fixupPluginRules(_import),
  },

  languageOptions: {
    parser: tsParser,
  },

  settings: {
    react: {
      version: "detect",
    },
  },

  rules: {
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-object-type": 0,
    "import/no-mutable-exports": "error",
    "import/no-absolute-path": 2,
    "import/no-nodejs-modules": 2,
    "import/first": 2,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ],

    "import/order": ["error", {
      groups: [["builtin", "external", "internal"]],

      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    }],

    "jest/expect-expect": 0,
    "jest/no-conditional-expect": 0,
  },
}];
