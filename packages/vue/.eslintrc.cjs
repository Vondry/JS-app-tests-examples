module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@tanstack/eslint-plugin-query/recommended',
        'plugin:prettier/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    'parser': 'vue-eslint-parser',
    'parserOptions': {
        'parser': '@typescript-eslint/parser'
    }
};
