import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import pluginQuery from '@tanstack/eslint-plugin-query';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
    {
        ignores: ['dist', 'eslint.config.js']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...eslintPluginSvelte.configs['flat/recommended'],
    ...eslintPluginSvelte.configs['flat/prettier'],
    ...pluginQuery.configs['flat/recommended'],
    prettierRecommended,
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.svelte']
            }
        }
    },
    {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        rules: {
            'no-redeclare': 'off'
        }
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser
            }
        }
    }
);
