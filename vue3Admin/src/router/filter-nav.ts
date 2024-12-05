// 目前后台设置的菜单权限是平级,所以这里只考虑了一个层级,如果需要多层级的权限配置,需要修改 filterNav 和 getAllAuths
import settings from '@/settings'
import { RouterTy } from '@/types/router'

const filterNav = (list: RouterTy, navList: Array<string> = [], isAdmin = false) => {
  if (!settings.filterNav || isAdmin || import.meta.env.VITE_ENV === 'serve') return list
  // eslint-disable-next-line max-len
  return list.filter((item) => (item?.meta?.auth ? navList.includes(item.meta.auth as string) : true))
}

// eslint-disable-next-line max-len
export const getAllAuths = (routes: RouterTy) => routes.map((item) => item?.meta?.auth).filter((item) => item)

export default filterNav
