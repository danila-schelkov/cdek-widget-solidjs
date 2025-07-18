import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintComments from "eslint-plugin-eslint-comments";
import noOnlyTests from "@eslint-community/eslint-plugin-no-only-tests";
import { defineConfig, globalIgnores } from "eslint/config";

import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
    includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
    globalIgnores([
        "**/node_modules",
        "**/dist",
        "**/dev",
        "**/tsup.config.ts",
        "**/vitest.config.ts",
    ]),
    {
        files: ['**/*.{ts,tsx,js,jsx}'],

        plugins: {
            "@typescript-eslint": typescriptEslint,
            "no-only-tests": noOnlyTests,
            "eslint-comments": eslintComments,
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 5,
            sourceType: "module",

            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: ".",
            },
        },

        rules: {
            "prefer-const": "warn",
            "no-console": "warn",
            "no-debugger": "warn",

            "@typescript-eslint/no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
            }],

            "@typescript-eslint/no-unnecessary-type-assertion": "warn",
            "@typescript-eslint/no-unnecessary-condition": "warn",
            "@typescript-eslint/no-useless-empty-export": "warn",
            "no-only-tests/no-only-tests": "warn",
            "eslint-comments/no-unused-disable": "warn",
        },
    }
]);
