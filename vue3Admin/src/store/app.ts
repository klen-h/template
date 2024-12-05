import { defineStore } from 'pinia'
import { AppTy } from '@/types/store'
import { ObjTy } from '@/types/common'
import Cookies from 'js-cookie'
import defaultSettings from '@/settings'

export const useAppStore = defineStore({
  id: 'app', // id必填，且需要唯一
  state: (): AppTy => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false,
    },
    device: 'desktop',
    settings: defaultSettings,
    cachedViews: [] as Array<string>,
    cachedViewsDeep: [] as Array<string>,
  }),
  actions: {
    M_settings(data) {
      this.$patch((state) => {
        // eslint-disable-next-line no-param-reassign
        state.settings = {
          ...state.settings, ...data,
        }
      })
    },
    /* keepAlive缓存 */
    M_ADD_CACHED_VIEW(view) {
      this.$patch((state) => {
        if (state.cachedViews.includes(view)) return
        state.cachedViews.push(view)
      })
    },

    M_DEL_CACHED_VIEW(view) {
      this.$patch((state) => {
        const index = state.cachedViews.indexOf(view)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        index > -1 && state.cachedViews.splice(index, 1)
      })
    },
    M_RESET_CACHED_VIEW() {
      this.$patch((state) => {
        // eslint-disable-next-line no-param-reassign
        state.cachedViews = []
      })
    },
    /* third  keepAlive */
    M_ADD_CACHED_VIEW_DEEP(view) {
      this.$patch((state) => {
        if (state.cachedViewsDeep.includes(view)) return
        state.cachedViewsDeep.push(view)
      })
    },
    M_DEL_CACHED_VIEW_DEEP(view) {
      this.$patch((state) => {
        const index = state.cachedViewsDeep.indexOf(view)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        index > -1 && state.cachedViewsDeep.splice(index, 1)
      })
    },
    M_RESET_CACHED_VIEW_DEEP() {
      this.$patch((state) => {
        // eslint-disable-next-line no-param-reassign
        state.cachedViewsDeep = []
      })
    },
    toggleSideBar() {
      Cookies.set('sidebarStatus', this.sidebar.opened ? 0 : 1)
      this.sidebar.opened = !this.sidebar.opened
    },
    closeSideBar(data: ObjTy) {
      Cookies.set('sidebarStatus', 0)
      this.sidebar.withoutAnimation = data.withoutAnimation
      this.sidebar.opened = false
    },
    toggleDevice(device: string) {
      this.device = device
    },
  },
})
