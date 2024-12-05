import { defineStore } from 'pinia'
import { loginLogout, getUserinfo } from '@/api/user'
import { UserTy } from '@/types/store'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: (): UserTy => ({
    userinfo: {},
  }),
  getters: {
    userName: (state) => state.userinfo?.nick,
    userAvatar: (state) => state.userinfo?.j_user?.avatar,
  },
  actions: {
    getInfo() {
      return new Promise((resolve, reject) => {
        getUserinfo()
          .then(({ data }) => {
            if (!data) {
              reject(new Error('Verification failed, please Login again.'))
            }
            this.userinfo = data
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout() {
      return new Promise((resolve) => {
        loginLogout()
        resolve(null)
      })
    },
  },
})
