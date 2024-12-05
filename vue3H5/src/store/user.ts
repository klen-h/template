import { defineStore } from 'pinia'
import { getUser } from '@/utils/auth'
import { UserTy } from '@/types/store'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: (): UserTy => ({
    userinfo: null,
  }),
  getters: {},
  actions: {
    async getUser() {
      try {
        const user: any = await getUser()
        this.userinfo = user
        return user
      } catch (error) {
        console.log(error)
        return null
      }
    },
  },
})
