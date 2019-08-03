module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "no-underscore-dangle": 0,
        "no-param-reassign": 0,
        "import/prefer-default-export": 0,
        "no-unused-vars": 2,
        "arrow-body-style": [2, "always"],
        "arrow-parens": "off",
        "comma-dangle": ["error", "never"],
        "indent": ['error', 2, { SwitchCase: 1 }],
        "quotes": ['error', 'double'],
        // "semi": ["error", "never"],
        'no-console': 'warn',
    }
}
