import { VariablesTy } from '@/types/store'

export const CSS_VARIABLES_MAP: VariablesTy = {
  menuText: '--menu-text',
  menuActiveText: '--menu-active-text',
  subMenuActiveText: '--sub-menu-active-text',
  menuBg: '--menu-bg',
  navBarBg: '--nav-bar-bg',
  navBarClickText: '--nav-bar-click-text',
  navBarDisabledText: '--nav-bar-disabled-text',
  subMenuBg: '--sub-menu-bg',
  subMenuHover: '--sub-menu-hover',
  sideBarWidth: '--side-bar-width',
  progressBar: '--progress-bar',
  navBarHeight: '--nav-bar-height',
}

export const STORAGE_KEY = {
  TABLE_SIZE: 'TABLE_SIZE',
}

export const LOCK_KEY = {
  ACCESS_TOKEN: 'admin_token', // 用户token
  CURRENT_USER: 'CURRENT-USER', // 当前用户信息
  IS_LOCKSCREEN: 'IS-LOCKSCREEN', // 是否锁屏
  LOCKSCREEN_PWD: 'LOCKSCREEN_PWD', // 锁屏密码
  TABS_ROUTES: 'TABS-ROUTES', // 标签页
}
