module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'jest'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
    ],
    env: {
        'jest/globals': true,
    },
    parserOptions: { project: ['./tsconfig.json'] },
    overrides: [
        {
            files: ['**.test.ts'],
            rules: { '@typescript-eslint/no-explicit-any': 'off' },
        },
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        complexity: ['error', 7],
        'no-console': ['error'],
    },
}
