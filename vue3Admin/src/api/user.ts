import { createInstance } from '@/utils/index'

const userInstance = createInstance({
  baseURL: '',
  headers: {},
})

export function getUserinfo() {
  return userInstance.get('/', {
    params: {},
  })
}

export function loginLogout() {
}
