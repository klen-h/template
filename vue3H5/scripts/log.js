import logSymbols from 'log-symbols'
import chalk from 'chalk'

/**
 * @param {*} msg 打印信息
 * @param {*} type [info,success,warning,error]
 * @param {*} color [red,green,blue...]
 */
export default ({ msg = '', type = 'success', color }) => {
  if (color === undefined) {
    // eslint-disable-next-line no-param-reassign
    color = {
      info: 'blueBright',
      success: 'green',
      warning: 'yellow',
      error: 'red',
    }[type]
  }
  console.log(logSymbols[type], chalk[color](msg))
}
