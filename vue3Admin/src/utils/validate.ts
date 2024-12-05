/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUserName(str: string): boolean {
  return ['admin', 'editor'].indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url: string): boolean {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str: string): boolean {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str: string): boolean {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str: string): boolean {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str: any): boolean {
  return typeof str === 'string' || str instanceof String
}

/**
 * @param {any} arg
 * @returns {Boolean}
 */
export function isArray(arg: any) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

import { ObjTy } from '@/types/common'

export const checkNeedErrorLog = (setting: ObjTy): boolean => {
  const env = import.meta.env.VITE_ENV
  const { errorLog } = setting
  if (typeof errorLog === 'string') {
    return env === errorLog
  }
  if (errorLog instanceof Array) {
    return errorLog.includes(env)
  }
  return false
}

export const isObject = (v) => Object.prototype.toString.call(v) === '[object Object]'

export const isFunction = (v) => typeof v === 'function'

export const isNull = (v, { lengEmptyIsNull = false } = {}) => {
  if (isFunction(v)) return false
  const isNullValue = v === void 0 || v === null || v === ''
  if (isNullValue) return isNullValue
  if (lengEmptyIsNull) {
    return (isObject(v) || isArray(v)) && Object.keys(v).length === 0
  }
  return false
}
