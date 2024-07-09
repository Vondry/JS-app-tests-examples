module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'plugin:prettier/recommended',
        'eslint:recommended',
        'plugin:svelte/recommended',
        'plugin:@tanstack/eslint-plugin-query/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.svelte'] // This is a required setting in `@typescript-eslint/parser` v4.24.0.
    },
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
            parserOptions: {
                parser: '@typescript-eslint/parser'
            }
        },
        {
            // Turn of wrong no-redeclare error for 'screen' (but only for test files)
            'files': ['./src/**/*.test.ts', './src/**/*.spec.ts'],
            'rules': {
                'no-redeclare': 'off'
            }
        }
    ]
};
