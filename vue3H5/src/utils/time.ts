import { ObjTy } from '@/types/common'

type timeTy = Date | string | number

/**
 * Parse the time to string
 * @param {(Date|string|number)} time
 * @param {string} format
 * @returns {string}
 */
export function parseTime(time: timeTy, format = '{y}-{m}-{d} {h}:{i}:{s}') {
  if (arguments.length === 0) {
    return null
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      // eslint-disable-next-line no-param-reassign
      time = parseInt(time, 10)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      // eslint-disable-next-line no-param-reassign
      time *= 1000
    }
    if (typeof time === 'string' && time.includes('-')) {
      // eslint-disable-next-line no-param-reassign
      time = time.replace(/-/g, '/')
    }
    date = new Date(time)
  }
  const formatObj: ObjTy = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
  return timeStr
}

/**
 * 距今多少天, 大于0为还剩多少天, 小于0则过去多少天
 * @param {string} dateStr 2022-11-28 14:40:46
 */
export const distanceFromToday = (dateStr = '') => {
  const distanceTime = new Date(dateStr.replace(/-/g, '/')).getTime() - new Date().getTime()
  return distanceTime / (24 * 3600 * 1000)
}
