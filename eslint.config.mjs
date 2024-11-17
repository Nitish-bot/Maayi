// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import ts from "@eslint/ts";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: ts.configs.recommended,
//     allConfig: ts.configs.all
// });
// export default [...compat.extends("next/core-web-vitals", "next/typescript")];

import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const config = {
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],
    ignores: ["node_modules/**", ".next/**", "dist/**"],
    languageOptions: {
        ecmaVersion: 5,
        sourceType: "module",
        parser: "eslintPlugin/parser",
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            }
        }
    },
    settings: {
        next: {
            rootDir: __dirname
        }
    },
    plugins: {
        "@typescript-eslint": ts,
    },
    rules: {
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": ["error", {
            "allowShortCircuit": true,
            "allowTernary": true,
            "allowTaggedTemplates": true
        }]
    }
};

const nextConfig = compat.extends("next/core-web-vitals", "next/typescript");
const finalConfig = [config, ...nextConfig];

export default finalConfig;
