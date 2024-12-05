/**
 * 时间格式化
 * @param {(object|string|number)} time 时间戳/时间对象
 * @param {string} cFormat {y}-{m}-{d} {h}:{i}:{s}   {a}为周几
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
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
  const formatObj = {
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
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export function throttle(func, wait, type = 1) {
  let previous = 0
  let timeout

  return (...args) => {
    const context = this
    if (type === 1) {
      const now = Date.now()

      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

/**
 * 函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout; let args; let context; let timestamp; let
    result

  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) {
          args = null
          context = null
        }
      }
    }
  }

  return (...args) => {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      // eslint-disable-next-line no-param-reassign
      args = null
      context = null
    }

    return result
  }
}

/**
 * 获取滚动位置/滚动到对应位置
 * @param {string|number|undefined} num 不传num则获取当前滚动位置,传num则滚到到对应位置
 * @returns number | undefined
 */
export const jinScrollTop = (num) => {
  if (typeof num === 'undefined') {
    return (
      document.documentElement.scrollTop
      || window.scrollY
      || document.body.scrollTop
    )
  } if (document.documentElement && document.documentElement.scrollTop) {
    document.documentElement.scrollTop = Number(num)
    window.scrollTo && window.scrollTo(0, Number(num))
  } else if (document.body) {
    document.body.scrollTop = Number(num)
    window.scrollTo && window.scrollTo(0, Number(num))
  }
  return undefined
}

/**
 * 解析当前url得出参数
 * @returns {object} {query,hashQuery}
 */
export const getLocationQuery = () => {
  const query = {}
  const hashQuery = {}
  let hashStr = window.location.hash
  let searchStr = window.location.search
  try {
    if (searchStr && /^\?/.test(searchStr)) {
      searchStr = searchStr.slice(1)
      if (searchStr && searchStr.slice(-1) === '/') {
        searchStr = searchStr.slice(0, -1)
      }
    }
    if (hashStr && hashStr.includes('?')) {
      hashStr = hashStr.slice(hashStr.indexOf('?') + 1)
    }
    const splitSearchArr = searchStr ? searchStr.split('&') : []
    const splitHashArr = hashStr ? hashStr.split('&') : []
    const maxLeng = Math.max(splitSearchArr.length, splitHashArr.length)

    for (let i = 0, len = maxLeng; i < len; i++) {
      const searchItem = splitSearchArr[i]
      const hashItem = splitHashArr[i]
      if (searchItem) {
        const temp = searchItem.split('=')
        query[temp[0]] = temp[1] || null
      }
      if (hashItem) {
        const temp = hashItem.split('=')
        hashQuery[temp[0]] = temp[1] || null
      }
    }
  } catch (error) {
    console.log('getLocationQuery', error.message)
  }

  return {
    query,
    hashQuery,
  }
}

/**
 * @description: localStorage封装
 */
export const storage = {
  /**
   * @description: 等同于localStorage.getItem, 返回前存储的值先进行JSON.parse,出错则直接返回存储的值
   * @param {string} name 需要获取的key
   * @return {string|null}
   */
  get(name) {
    const value = localStorage.getItem(name)
    if (!value) {
      return null
    }
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },
  /**
   * @description: 等同于localStorage.setItem, 只是对象会先经过stringify处理
   * @param {*} name 需要设置的key
   * @param {*} value 需要存储的值
   */
  set(name, value) {
    localStorage.setItem(
      name,
      typeof value === 'object' ? JSON.stringify(value) : value,
    )
  },
}

export const loadScript = (url, options = {}) => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = url
  script.async = options.async !== false //
  script.defer = options.defer || false //
  script.type = options.type || 'text/javascript'

  // 处理脚本加载完成和错误事件
  script.onload = () => resolve(script) //
  script.onerror = (error) => reject(new Error(`Script load error for ${url}: ${error.message}`))

  document.head.appendChild(script)
})
