/*类型命名建议以Ty结尾*/
/*
*
枚举 类，接口 都是大驼峰 WangMeng
方法，变量，常量 小驼峰 wangMeng
* */
/*通用对象*/
export interface ObjTy {
  [propName: string]: any
}

export interface RequestHeadersTy {
  [propName: string]: string | number | boolean
  // 是否直接捕捉请求错误并弹出提示,401则直接跳转登录页
  handleError?: 0 | 1
}

export interface ResponseDataTy {
  status: number
  message?: string
}

export interface LogDataTy {
  url: string | undefined
  method: string | undefined
  headers: ObjTy
  data: ObjTy | undefined
  params: ObjTy | undefined
}

export interface tablePageHookParamTy {
  filters?: ObjTy
  getTableData: function
  excludeKeys?: Array
  numberKeys?: Array
  objectKeys?: Array
}

export type FnType = (...[]: any[]) => any;

type ArgsType = any[]
