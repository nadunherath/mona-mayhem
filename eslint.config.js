import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const unusedVarsRule = [
	'error',
	{
		args: 'all',
		argsIgnorePattern: '^_',
		caughtErrors: 'all',
		caughtErrorsIgnorePattern: '^_',
		destructuredArrayIgnorePattern: '^_',
		ignoreRestSiblings: true,
		varsIgnorePattern: '^_',
	},
];

const codeStyleRules = {
	curly: ['error', 'all'],
	eqeqeq: ['error', 'always'],
	'no-var': 'error',
	'object-curly-spacing': ['error', 'always'],
	'object-shorthand': ['error', 'always'],
	'prefer-const': 'error',
	quotes: ['error', 'single', { avoidEscape: true }],
	semi: ['error', 'always'],
	'comma-dangle': ['error', 'always-multiline'],
};

const importRules = {
	'simple-import-sort/imports': 'error',
	'simple-import-sort/exports': 'error',
	'unused-imports/no-unused-imports': 'error',
	'unused-imports/no-unused-vars': unusedVarsRule,
};

export default [
	{
		ignores: ['dist/**', '.astro/**', 'node_modules/**', 'docs/**'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs['flat/recommended'],
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports,
		},
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			...codeStyleRules,
			...importRules,
		},
	},
	{
		files: ['**/*.astro'],
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports,
		},
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			...codeStyleRules,
			...importRules,
		},
	},
];