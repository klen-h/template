// // postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿宽度的1/10，假设设计稿宽度为414px
      propList: ['*'], // 需要转换的属性列表，'*' 表示全部
      selectorBlackList: [], // 忽略转换的正则匹配项
      replace: true, // 是否直接替换字符串
      mediaQuery: false, // 媒体查询里的单位是否需要转换px
      // 其他配置...
    },
  },
}
