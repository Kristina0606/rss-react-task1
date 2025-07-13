import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
/** @type {import('eslint').Linter.Config[]} */

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': eslintReactHooks,
      react: pluginReact,
      'react-refresh': eslintReactRefresh,
      prettier: prettierPlugin,
    },
    extends: [js.configs.recommended, pluginReact.configs.flat['jsx-runtime']],
  },
  { ignores: ['node_modules', 'dist', 'eslint.config.js', 'vite.config.js'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.es2021 },
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    rules: {
      ...eslintConfigPrettier.rules,
      'prefer-const': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
  ...tseslint.configs.recommended,
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
);
