import { createInstance } from '@/utils/index'
import { ObjTy, RequestHeadersTy } from '@/types/common'

const instance = createInstance({
  baseURL: '',
  headers: {
    'x-version': '1.0.0',
    'x-app-id': '',
    handleError: 1,
  } as RequestHeadersTy,
})

export function getById(params: ObjTy) {
  return instance.get('/', {
    params,
  })
}
