/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '.eslintrc-auto-import.json',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 添加格式检验工具，保证eslint保存时自动格式化代码
  rules: {
    // 'vue/multi-word-component-names': [
    //   '',
    //   {
    //
    //   }
    // ],
    'prettier/prettier': [
      'error',
      {
        semi: false, // 分号
        wrapAttributes: false, // 属性不换行
        printWidth: 100, // 每行最大长度
        endOfLine: 'auto', // 换行符
        'vue/name-property-casing': 'off'
      }
    ]
  }
}
