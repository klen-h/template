import axios from 'axios'
import { Toast } from 'vant'

let token = ''
export const setRequestToken = (value) => {
  token = value
}
const getToken = () => token

let udid = ''
export const setRequestUDID = (value) => {
  udid = value
}
const getUDID = () => udid

const handleError = (error) => {
  let options = {
    type: 'error',
    message: error.message,
  }
  if (error.response) {
    const { data = '', status } = error.response
    const schemas = {
      defaults: {
        type: 'error',
        message: data.message || error.message,
      },
      codes: {
        200: {
          type: 'warning',
        },
        '200,401': {
          // 未登录
          behavior() {
            // 401跳到登录页
            // 提示尚未登录或者登录超时，请重新登录
          },
        },
      },
    }
    options = {

      ...schemas.defaults,
      ...schemas.codes[status],
      ...schemas.codes[`${status},${data.status}`],
    }
  } else {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      options.message = '请求超时，请检查网络是否连接正常'
    }
    // 可以展示断网组件
    options.message = '请求失败，请稍后再试'
  }
  // 请求失败提示
  Toast.fail(options.message)
  console.log(options.message)

  options.behavior && options.behavior()
}

export function createInstance(config) {
  const instance = axios.create({
    withCredentials: true,
    timeout: 20000,
    ...config,
  })

  // 请求前拦截
  instance.interceptors.request.use(
    (config) => {
      const xToken = getToken()
      const xUDID = getUDID()
      if (config.headers.needToken && xToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers['x-token'] = xToken
      }
      if (config.headers.needUDID && xUDID) {
        // eslint-disable-next-line no-param-reassign
        config.headers['x-udid'] = xUDID
      }
      if (config.method === 'get') {
        // eslint-disable-next-line no-param-reassign
        if (!config.params) config.params = {}
        // eslint-disable-next-line no-param-reassign
        config.params.t = new Date().getTime()
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  /**
   * 响应拦截器 resolve
   */
  instance.interceptors.response.use((response) => {
    const { data, config, request } = response
    if (data.status !== 200) {
      const error = Object.assign(new Error(data.message), {
        config,
        request,
        response,
      })
      return Promise.reject(error)
    }
    return Promise.resolve(data.data)
  })

  /**
   * 响应拦截器 reject
   */
  instance.interceptors.response.use(null, (error) => {
    if (error.config.headers.handleError) {
      handleError(error)
    }
    return Promise.reject(error)
  })

  return instance
}

function windowPrefixZero(num) {
  if (num < 10) return `0${num}`
  return num
}

/**
 * 请求json文件
 * @param {String} url json地址
 * @param {Number} cachInterval 缓存控制间隔,如每两分钟变换一次请求时间参数,则传2
 * @returns Promise
 */
export async function getJson(url, cachInterval = 0) {
  let t = '0'
  if (cachInterval) {
    const ENTER_NOWTIME = new Date()
    t = `${
      ENTER_NOWTIME.getFullYear()
    }${windowPrefixZero(ENTER_NOWTIME.getMonth() + 1)
    }${windowPrefixZero(ENTER_NOWTIME.getDate())
    }${windowPrefixZero(ENTER_NOWTIME.getHours())
    }_${
      windowPrefixZero(Math.ceil(ENTER_NOWTIME.getMinutes() / cachInterval))}`
  }
  try {
    const res = await axios.get(`${url}?t=${t}`)
    if (res.status === 200 && res.data) {
      return res.data
    }
    return null
  } catch (error) {
    console.log(
      `getJson ${error.config ? error.config.url : ''} Error: ${error.message}`,
    )
    return null
  }
}

export default createInstance()
