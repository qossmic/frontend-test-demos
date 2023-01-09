module.exports = {
  root: true,

  env: {
    node: true
  },

  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],

  "plugins": [
    "no-only-tests"
  ],

  parserOptions: {
    parser: '@babel/eslint-parser'
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-only-tests/no-only-tests": "error"
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/e2e/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
