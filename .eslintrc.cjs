module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/essential',
  ],
  overrides: [
    {
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'class-methods-use-this': 0,
    'vue/multi-word-component-names': 0,
    'import/no-extraneous-dependencies': 0,
    'no-shadow': 0,
    'no-param-reassign': 0,
  },
};
