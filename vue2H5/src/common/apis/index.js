import { createInstance } from '@/common/request'
import { isTestEnv } from '@/common/constant'

const version = (version) => ({
  'x-app-id': '',
  'x-version': version,
  handleError: true,
  needToken: true,
})

const flashInstance = createInstance({
  baseURL: '',
  headers: version(isTestEnv ? '0.0.1' : '1.0.0'),
})

export function getFlashList(params) {
  return flashInstance.get('/', {
    params,
  })
}
