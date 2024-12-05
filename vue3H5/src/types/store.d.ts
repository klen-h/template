import { RouterTy } from '@/types/router'
import { ObjTy, SettingTy } from '@/types/common'

interface UserTy {
  userinfo: ObjTy
}

interface AppTy {
  device: string,
  settings: SettingTy,
}
interface VariablesTy {
  progressBar: string
}
interface ThemeTy {
  variables: variablesTy
}
type VariablesParamTy = Partial<VariablesTy>

interface LangTy {
  lang: string
}