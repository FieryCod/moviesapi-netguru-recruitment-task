module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['standard'],
  plugins: [],
  rules: {
    'operator-linebreak': ['error', 'after']
  },
  globals: {
    describe: true,
    before: true,
    it: true,
    ctx: true
  }
}
