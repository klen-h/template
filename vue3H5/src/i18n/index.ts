import { createI18n } from 'vue-i18n'
import en from '@/locale/en'
import zh from '@/locale/zh'
import { LangEnum } from '@/types/enum'
import { getLocale } from '@/utils'

// 语言数组
export const langList = [
  {
    label: '中文',
    key: LangEnum.ZH,
  },
  {
    label: 'English',
    key: LangEnum.EN,
  },
]

const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  messages: {
    [LangEnum.ZH]: zh,
    [LangEnum.EN]: en,
  },
})

export default i18n
