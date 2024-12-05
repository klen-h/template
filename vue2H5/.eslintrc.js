const PROJECT_CONFIG = require('./project_config')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:vue/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      webpack: {
        config: {
          resolve: PROJECT_CONFIG.RESOLVE,
        },
      },
    },
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'quote-props': ['error', 'as-needed'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/no-v-html': 'off',
    semi: ['error', 'never'],
    // '@typescript-eslint/semi': ['error', 'never'],
    // '@typescript-eslint/no-explicit-any': 'off',
    'id-length': [
      'error',
      {
        min: 2,
        properties: 'never',
        // v-value sort((a, b)) i-for t-time h-vuerender e-error
        exceptions: ['v', 'a', 'b', 'i', 't', 'h', 'e'],
      },
    ],
    'no-void': 'off',
    'no-plusplus': 'off',
    'no-unused-expressions': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 1,
        },
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    // 有bug,无法正确检测依赖,故禁用
    'import/no-extraneous-dependencies': 'off',
    // mac和win的换行符有差异，实际对代码无影响，直接禁用
    'linebreak-style': 'off',

    // 无法解析别名时禁用
    // 'import/no-unresolved': 'off',

    // ts禁用
    // 'import/extensions': 'off',

    // 酌情禁用, 最好是遵守
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'off',
    // 'vue/require-default-prop': 'off',
  },
}
