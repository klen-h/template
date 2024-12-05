import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// 自动注册全局组件，页面直接使用
const requireCom = require.context('../components', true, /\.vue$/)

export default function install(Vue) {
  requireCom.keys().forEach((fileName) => {
    const comConfig = requireCom(fileName)
    const comName = upperFirst(
      camelCase(
        // 剥去文件名开头的 `./` 和结尾的扩展名
        fileName
          .replace(/^\.\/(.*)\.\w+$/, '$1')
          .split('/')
          .pop(),
      ),
    )
    Vue.component(comName, comConfig.default || comConfig)
  })
}
