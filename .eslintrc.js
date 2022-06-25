module.exports = {
  env: { browser: true, es2021: true },
  extends: ['xo', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort', 'svelte3', 'unused-imports'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/imports': ['error', { groups: [['^\\u0000', '^@?\\w', '^', '^\\.']] }],
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
  },
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
}
