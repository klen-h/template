import { defineStore } from 'pinia'
import { LangTy } from '@/types/store'
import { LangEnum } from '@/types/enum'
import i18n from '@/i18n/index'
import { getLocale, storage } from '@/utils/index'
import { LANG_STORE } from '@/utils/storageKeys'

export const useLangStore = defineStore({
  id: 'lang', // id必填，且需要唯一
  state: (): LangTy => ({
    lang: getLocale(),
  }),
  actions: {
    changeLang(lang: LangEnum): void {
      if (this.lang === lang) return
      this.lang = lang
      i18n.global.locale.value = lang
      storage.set(LANG_STORE, this.lang, null)
    },
  },
})
