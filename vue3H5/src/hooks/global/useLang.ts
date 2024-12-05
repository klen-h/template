import { NamedValue, useI18n } from 'vue-i18n'
import en from '@/locale/en'

type Translations = typeof en

// type PathToLeaves<T, Cache extends string = ''> = T extends PropertyKey
//   ? Cache
//   : {
//       [P in keyof T]: P extends string
//         ? Cache extends ''
//           ? PathToLeaves<T[P], `${P}`>
//           : PathToLeaves<T[P], `${Cache}.${P}`>
//         : never;
//     }[keyof T]

// type TranslationPaths = PathToLeaves<Translations>

export const useLang = () => {
  const { t } = useI18n()

  function tFunc<T extends keyof Translations>(path: T, named?: NamedValue) {
    return (named ? t(path, named) : t(path)) as Translations[T]
  }

  return {
    t: tFunc,
  } as const
}
