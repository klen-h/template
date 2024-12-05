import { LangEnum } from '@/types/enum'
import { storage } from '@/utils/index'
import { LANG_STORE } from './storageKeys'

export const getLocale = () => {
  const storageLang = storage.get(LANG_STORE)
  if (storageLang) return storageLang

  const browserLanguage = navigator.language.toLowerCase()
  if (browserLanguage.includes('zh')) {
    return LangEnum.ZH
  }
  return LangEnum.EN
}
