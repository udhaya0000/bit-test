module.exports = {
  root: true,
  env: {
    node: true,
  },
  //extends: ['plugin:vue/essential', '@vue/standard'],
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'vue/require-v-for-key': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
