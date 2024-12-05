import { createInstance } from '@/utils/index'
import { ObjTy, RequestHeadersTy } from '@/types/common'

const instance = createInstance({
  baseURL: '',
  headers: {
    // ...
    handleError: 1,
  } as RequestHeadersTy,
})

export function getList(params: ObjTy) {
  return instance.get('/', {
    params,
  })
}
