const path = require('path')

module.exports = {
  // 适配的设计稿基准值
  REM_ROOTVALUE: 37.5,
  ADAPTATION: ['rem'],
  // 页面的标题、描述及分享图（作为meta og:image的content）
  TITLE: '页面标题',
  DESC: '页面描述',
  SHAREPIC: '', // 分享图
  RESOLVE: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './src/assets'),
      img: path.resolve(__dirname, './src/assets/noCompression'),
      min: path.resolve(__dirname, './src/assets/compressed'),
      origin: path.resolve(__dirname, './src/assets/original'),
    },
  },
}
