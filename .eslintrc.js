module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    semi: 'off',
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'object-curly-spacing': 'off',
    'spaced-comment': 'off',
    'no-debugger': 'off',
    indent: 'off',
    'no-unused-vars': 'off',
  },
}
