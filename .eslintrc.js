// TODO
// Pro Tip:
// For larger codebases you may want to consider splitting our linting into two separate stages:
// 1. fast feedback rules which operate purely based on syntax (no type-checking),
// 2. rules which are based on semantics (type-checking).
module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // prettier must be last
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/babel',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    // debugLevel: true,
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // eslint
    'no-cond-assign': [2, 'except-parens'],
    'no-nested-ternary': 0,
    'no-param-reassign': [2, { props: false }],
    'no-return-assign': [2, 'except-parens'],
    'no-self-compare': 0,
    'no-underscore-dangle': [
      2,
      { allowAfterThis: true, allow: ['__typename'] },
    ],
    'no-unused-vars': [
      2,
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    // import
    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    // typescript
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': [
      0,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'interface',
        format: null,
        custom: {
          regex: '^I([A-Z][A-Za-z0-9]+)*(_[a-z]+)*$',
          match: true,
        },
        leadingUnderscore: 'forbid',
      },
    ],
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowDirectConstAssertionInArrowFunctions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
        allowedNames: [],
        shouldTrackReferences: true,
      },
    ],
  },
};
