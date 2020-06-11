module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  root: true,
  plugins: ['@typescript-eslint', 'prettier', 'jest', 'import'],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/camelcase': 0,
    'import/no-absolute-path': 2,
    'import/first': 2,
    'import/order': 0,
    'import/default': 0,
    'jest/expect-expect': 0
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: './src'
      }
    }
  }
}
