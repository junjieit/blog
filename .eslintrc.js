module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'plugin:react/recommended'
  ],
  plugins: [
    'react-hooks'
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  root: true,
  globals: {
    ga: true,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'array-callback-return': 'off',
    'no-param-reassign': 'off',
    'no-debugger': 'off',
    'max-nested-callbacks': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};