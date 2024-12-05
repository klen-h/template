import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/getUserInfo',
    method: 'post',
    response: () => ({
      data: {
        userName: 'admin',
      },
      flag: 1,
    }),
  },
] as MockMethod[]
