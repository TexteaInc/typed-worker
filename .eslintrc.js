module.exports = {
  extends: ['eslint:recommended', 'standard'],
  globals: {
    Atomics: 'readonly', SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      globalReturn: false, impliedStrict: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'simple-import-sort',
    'import',
    'unused-imports'
  ],
  rules: {
    eqeqeq: 'error',
    'no-eval': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn', {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-unused-expressions': 'warn',
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    camelcase: 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error', {
        multiline: {
          delimiter: 'none', requireLast: true
        },
        singleline: {
          delimiter: 'semi', requireLast: false
        }
      }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-restricted-imports': 'off'
  }
}
