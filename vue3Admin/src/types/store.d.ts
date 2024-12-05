import { RouterTy } from '@/types/router'
import { ObjTy, SettingTy } from '@/types/common'

interface UserTy {
  roles?: Array<string>
  userinfo: ObjTy
}

interface AppTy {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  device: string,
  settings: SettingTy,
  cachedViews: Array<string>,
  cachedViewsDeep: Array<string>
}
interface PermissionTy {
  isGetUserInfo: boolean // 是否已经设置了权限
  routes: RouterTy // 将过滤后的异步路由和静态路由集合
  addRoutes: RouterTy // 过滤后的异步路由
}
interface VariablesTy {
  menuText: string
  menuActiveText: string
  subMenuActiveText: string
  menuBg: string
  navBarBg: string
  navBarClickText: string
  navBarDisabledText: string
  subMenuBg: string
  subMenuHover: string
  sideBarWidth: string
  progressBar: string
  navBarHeight: string
}
interface ThemeTy {
  variables: variablesTy
}
type VariablesParamTy = Partial<VariablesTy>
