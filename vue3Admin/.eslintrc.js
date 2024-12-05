module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    './.eslintrc-auto-import.json',
  ],
  globals: {
    defineEmits: true,
    document: true,
    localStorage: true,
    window: true,
    defineProps: true,
    defineExpose: true,
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
    '@typescript-eslint/no-explicit-any': 'off',
    'id-length': [
      'error',
      {
        min: 2,
        properties: 'never',
        exceptions: ['v', 'a', 'b', 'i', 't'],
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

    // vue3需要禁用
    'import/first': 'off',
    'import/order': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    // 有bug,无法正确检测依赖,故禁用
    'import/no-extraneous-dependencies': 'off',
    // mac和win的换行符有差异，实际对代码无影响，直接禁用
    'linebreak-style': 'off',

    // 无法解析别名时禁用
    'import/no-unresolved': 'off',

    // ts禁用
    'import/extensions': 'off',

    // 酌情禁用, 最好是遵守
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'off',
    // 'vue/require-default-prop': 'off',
    'vue/no-v-model-argument': 'off',
  },
}
