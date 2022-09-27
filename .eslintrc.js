module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    indent: 'off',
    'no-trailing-spaces': 'off',
    'space-before-function-paren': 'off',
    'space-before-blocks': 'off',
    'key-spacing': 'off',
    eqeqeq: 'off',
    'space-in-parens': 'off',
    'comma-dangle':'off',
    'comma-spacing':'off'
  }
}
