module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 0,
    "vue/no-use-v-if-with-v-for": 0,
    "vue/valid-v-for": 0,
    "vue/no-v-for-template-key": 0,
  },
  plugins: ['vue']
};
