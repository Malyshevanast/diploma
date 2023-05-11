module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    'no-console': 'off',
    // prettier
    'prettier/prettier': 'warn',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
