module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    extends: [
        'prettier'
    ],
    plugins: [
        'prettier',
        '@typescript-eslint'
    ],
    rules: {
        'no-console': 'off',
        '@typescript-eslint/no-unused-vars': 'error'
    }
}
