import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios'

import {
  LogDataTy,
  RequestHeadersTy,
  ResponseDataTy,
} from '@/types/common'
import { redirectLogin } from '@/utils/index'

let token = ''
export const setRequestToken = (value: string) => {
  token = value
}
const getToken = (): string => token

let udid = ''
export const setRequestUDID = (value: string) => {
  udid = value
}
const getUDID = (): string => udid

const logText = (text: string) => {
  try {
    console.log(text)
  } catch (error) {
    console.log(error)
  }
}

export const createInstance = (config: AxiosRequestConfig) => {
  const instance = axios.create({
    withCredentials: true,
    timeout: 60000,
    ...config,
  })

  // 请求前拦截
  instance.interceptors.request.use(
    (config) => {
      const xToken = getToken()
      if (config.headers.needToken && xToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers['x-token'] = xToken
      }
      const xUDID = getUDID()
      if (config.headers.needUDID && xUDID) {
        // eslint-disable-next-line no-param-reassign
        config.headers['x-udid'] = xUDID
      }
      const { baseURL, data, headers, method, params, url } = config
      const logHeaders: RequestHeadersTy = headers
      const logData: LogDataTy = {
        url: (baseURL as string) + url,
        method,
        headers: {
          ...logHeaders.common,
          ...logHeaders[method as string],
        },
        data,
        params,
      }
      logText(`发送请求: ${JSON.stringify(logData)}`)
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
    return Promise.resolve(data)
  })

  /**
   * 响应拦截器 reject
   */
  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (error) => {
      if (error.config.headers.handleError) {
        // eslint-disable-next-line no-use-before-define
        handleError(error)
      }
      return Promise.reject(error)
    },
  )

  return instance
}

function handleError(error: AxiosError) {
  let options: any = {
    type: 'error',
    message: error.message,
  }
  if (error.response) {
    const { data = '', status } = error.response
    const schemas: any = {
      defaults: {
        type: 'error',
        message: (data as ResponseDataTy).message || error.message,
      },
      codes: {
        200: {
          type: 'warning',
        },
        '200,401': {
          type: 'error',
          // 未登录
          behavior() {
            redirectLogin()
          },
        },
      },
    }
    options = {
      ...schemas.defaults,
      ...schemas.codes[status],
      ...schemas.codes[`${status},${(data as ResponseDataTy).status}`],
    }
  } else {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      options.message = '请求超时，请检查网络是否连接正常'
    }
    // 可以展示断网组件
    options.message = '请求失败，请联系后端管理人员'
  }
  options.behavior && options.behavior()
}

const numPrefixZero = (num: number) => {
  if (num < 10) return `0${String(num)}`
  return String(num)
}

/**
 * 请求json文件
 * @param {String} url json地址
 * @param {Number} cachInterval 缓存控制间隔,如每两分钟变换一次请求时间参数,则传2
 * @returns Promise
 */
export async function getJson(url: string, cachInterval = 0) {
  let t = '0'
  if (cachInterval) {
    const ENTER_NOWTIME = new Date()
    t = `${ENTER_NOWTIME.getFullYear()
      + numPrefixZero(ENTER_NOWTIME.getMonth() + 1)
      + numPrefixZero(ENTER_NOWTIME.getDate())
      + numPrefixZero(ENTER_NOWTIME.getHours())
    }_${
      numPrefixZero(Math.ceil(ENTER_NOWTIME.getMinutes() / cachInterval))}`
  }
  try {
    logText(`getJson ${url}`)
    const res = await axios.get(`${url}?t=${t}`)
    if (res.status === 200 && res.data) {
      return res.data
    }
    return null
  } catch (error: any) {
    logText(`getJson ${error.config ? error.config.url : ''} Error: ${error.message}`)
    return null
  }
}
