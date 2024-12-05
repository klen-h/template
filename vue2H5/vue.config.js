/* eslint-disable global-require */
const path = require('path')
const autoprefixer = require('autoprefixer')
const PROJECT_CONFIG = require('./project_config')

const resolve = (dir) => path.join(__dirname, dir)

// const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");
const isDev = process.env.NODE_ENV === 'development'

/* -----设置环境变量----- */
// 版本号环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
// 标题、描述、分享图环境变量, 以便全局使用
process.env.VUE_APP_SHAREPIC = PROJECT_CONFIG.SHAREPIC
process.env.VUE_APP_TITLE = PROJECT_CONFIG.TITLE
process.env.VUE_APP_DESC = PROJECT_CONFIG.DESC

const adaptationPlugins = []
if (PROJECT_CONFIG.ADAPTATION === 'rem') {
  adaptationPlugins.push(
    require('postcss-pxtorem')({
      rootValue: PROJECT_CONFIG.REM_ROOTVALUE,
      propList: ['*'],
      selectorBlackList: ['van-circle__layer'],
    }),
  )
}

module.exports = {
  publicPath: isDev ? '/' : './',
  outputDir: 'dist',
  // 解决文件更新后浏览器缓存导致的更新不生效问题
  filenameHashing: true,
  lintOnSave: isDev,
  // 运行时不需要动态编译模板,减少应用的体积
  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
  productionSourceMap: isDev,
  chainWebpack: (config) => {
    config.when(!isDev, (config) => {
      config.optimization.minimizer('terser').tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].terserOptions.compress.drop_console = true // 在生产环境下移除 console 语句
        return args
      })
    })
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('img', resolve('src/assets/noCompression'))
      .set('min', resolve('src/assets/compressed'))
      .set('origin', resolve('src/assets/original'))
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 给每个sass文件注入, 共享变量\mixin等
          resources: [
            './src/styles/abstracts/mixin.scss',
            './src/styles/abstracts/variables.scss',
            './src/styles/abstracts/function.scss',
          ],
        })
        .end()
    })

    config.module
      .rule('mjs')
      .test(/\.mjs$/)
      .include.add(resolve('node_modules/'))
      .end()
      .type('javascript/auto')
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: ['@babel/preset-env'],
      })
  },
  css: {
    // 是否使用css分离, 开发环境启用会导致样式热更新失效
    extract: !isDev,
    // 开启 CSS source maps?
    sourceMap: false,
    loaderOptions: {
      // 通过postcss-pxtorem插件把px转化成rem
      postcss: {
        plugins: [autoprefixer(), ...adaptationPlugins],
      },
    },
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    open: true,
    https: true,
    disableHostCheck: true,
    port: 8888,
  },
}
