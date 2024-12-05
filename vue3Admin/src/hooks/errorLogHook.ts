import setting from '@/settings'
import { ObjTy } from '@/types/common'
import { Debugout } from 'debugout.js'
import {
  device,
  checkNeedErrorLog,
  parseTime,
  bus,
} from '@/utils/index'

// 修改debugout时间格式
Debugout.prototype.formatDate = (t = new Date()) => `[${t.toLocaleString()}]`
const time = parseTime(new Date(), '{y}-{m}-{d}')
const isEdge = device().isEdge ? 'edge' : ''
const browser = isEdge || device().isChrome ? 'chrome' : 'other'
const $debugout = new Debugout({
  realTimeLoggingOn: true,
  useTimestamps: true,
  includeSessionMetadata: true,
  useLocalStorage: true,
  recordLogs: true,
  autoTrim: true,
  maxDepth: 2,
  maxLines: 300,
  logFilename: `${setting.title}日志${time}__${browser}.txt`, // 下载日志文件名
  localStorageKey: `${setting.appName}_log`,
  quoteStrings: true,
  indent: '',
})

export default () => {
  if (checkNeedErrorLog(setting)) {
    const emitAction = () => {
      setTimeout(() => {
        bus.emit('reloadErrorPage')
      }, 60)
    }
    window.$debugout = $debugout

    // JS运行时错误和资源加载错误
    window.addEventListener(
      'error',
      ({ error, target }: ObjTy) => {
        if (error) {
          let errLog = ''
          if (target.outerHTML) {
            // img error collection
            errLog = `${JSON.stringify(target.outerHTML)}`
          } else {
            errLog = `${error?.stack?.substr(0, 300)}`
          }
          $debugout.log('捕获到JS运行时错误、资源加载错误：', errLog)
          emitAction()
        }
      },
      // use Event capture  to collection  img error
      true,
    )

    // promise被reject并且错误信息没有被处理的时候，会抛出一个unhandledrejection
    // 接口错误处理，cross origin , 404,401
    window.addEventListener('unhandledrejection', ({ reason }) => {
      let errLog = ''
      if (typeof reason === 'string') {
        errLog = reason
      } else {
        errLog = `${reason?.stack?.substr(0, 300)}`
      }
      // 未授权和取消不捕捉
      // 此处可添加不捕捉状态码
      const unhandledCode = '403, 401'
      // 此处可添加不捕捉string
      const unhandledString = 'cancel'
      if (
        !unhandledCode.includes(reason?.code)
        && !errLog.includes(unhandledString)
      ) {
        $debugout.log('捕获到promise错误：', errLog)
        emitAction()
      }
    })

    // 一些特殊情况下，还需要捕获处理console.error，捕获方式就是重写window.console.error
    const oldConsoleError = window.console.error
    window.console.error = (...args) => {
      const errLog = args.join(',')
      if (errLog.indexOf('custom') === -1) {
        $debugout.log('捕获到其他错误：', errLog)
        emitAction()
      }
      // eslint-disable-next-line prefer-rest-params
      oldConsoleError && oldConsoleError.apply(window, args)
    }
  }
}
