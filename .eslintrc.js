module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-jsx'],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'react/jsx-indent': [0],
    'object-curly-spacing': [2]
  }
}
