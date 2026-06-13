module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // 通用规则
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'only-multiline'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'warn',
    'no-unused-vars': 'off', // 交给 @typescript-eslint/no-unused-vars 处理
    'no-undef': 'off',
    'no-useless-escape': 'off',

    // TypeScript 规则
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/prefer-as-const': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/no-shadow': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],
};