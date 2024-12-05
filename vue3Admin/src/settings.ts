import { RequestHeadersTy } from '@/types/common'

interface SettingTy {
  appName: string
  logo: string
  title: string
  commonHeaders: RequestHeadersTy
  fixedHeader: boolean
  sidebarLogo: boolean
  showDropDown: boolean
  showHamburger: boolean
  isNeedLogin: boolean
  isNeedNprogress: boolean
  showTagsView: boolean
  tagsViewNum: number
  errorLog: string | Array<string>
  requestLoading: boolean
  port: number
  childAppName: string
  namespace: string
  filterNav: boolean
}

const setting: SettingTy = {
  /**
   * 对应admin-upper下的后台名称，getUserinfo/front需要用到
   * 注意点说明: 同时一些存储的值会以这个作为key或者prefixKey, 一定不要冲突!!!
   */
  appName: '',
  logo: 'https://cli.vuejs.org/favicon.png',
  // 左上角标题
  title: '后台 - xxxx',
  commonHeaders: {
    handleError: 1,
  },
  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the drop-down
   */
  showDropDown: true,
  showHamburger: true,
  /**
   * @type {boolean} true | false
   * @description Whether need login
   */
  isNeedLogin: false,

  /**
   * @type {boolean} true | false
   * @description Whether need nprogress
   */
  isNeedNprogress: true,
  /**
   * @type {string | array} 'serve' | ['build', 'serve']
   * @description 错误日志,无后端仅靠本地存储记录.
   */
  errorLog: [],
  requestLoading: false,
  showTagsView: true,
  /**
   * @description TagsView show number
   */
  tagsViewNum: 6,
  port: 5005,
  /**
   * @type {string}
   * @desc 子应用名称，注册子应用使用，及同时作为顶级路由
   */
  childAppName: '',
  /**
   * @type {string}
   * @desc element 命名空间, 在微前端中使用,以达到不同应用间样式完全隔离的效果
   */
  namespace: 'el-test',
  /**
   * @desc 菜单需要设置权限才会展示
   */
  filterNav: false,
}

export default setting
