import { defineStore } from 'pinia'

export const useLayoutStore = defineStore({
  id: 'app-layout',
  state: () => ({
    isChildAppMode: false,
  }),
  actions: {
    changeLayoutMode(isChildAppMode: boolean) {
      this.isChildAppMode = isChildAppMode
    },
  },
})
