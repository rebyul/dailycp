import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import baseConfig from "../../eslint.config.mjs";

const compat = new FlatCompat({
	baseDirectory: dirname(fileURLToPath(import.meta.url)),
	recommendedConfig: js.configs.recommended,
});

export default [
	{
		ignores: ["**/dist"],
	},
	...baseConfig,
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
		// Override or add rules here
		rules: {},
		languageOptions: {
			parser: await import("@typescript-eslint/parser"),
			parserOptions: {
				sourceType: "module",
				ecmaVersion: "latest",
			},
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		// Override or add rules here
		rules: {},
	},
	{
		files: ["**/*.js", "**/*.jsx"],
		// Override or add rules here
		rules: {},
	},
];
