import { asyncRoutes } from '@/router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import settings from './settings'
import {
  getToken,
  redirectLogin,
  getPageTitle,
} from '@/utils/index'
import NProgress from 'nprogress'
import filterNav from '@/router/filter-nav'

NProgress.configure({
  showSpinner: false,
}) // NProgress Configuration
import 'nprogress/nprogress.css'
import { RouterRowTy, RouterTy } from '@/types/router'

export function setupPermission(router) {
  const whiteList = ['/login']
  router.beforeEach(async (to: any, from, next: any) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    // start progress bar
    if (settings.isNeedNprogress) NProgress.start()
    // set page title
    document.title = getPageTitle(to.meta.title)
    /*
   * 总的来说：过滤动态路由
   * 1.是否与token 没有去登录页 ,有 如果要去登录页则重定向到首页。没有, 重新定向到登录页
   * 2.判断是否权限筛选,是,直接放行。没有，筛选动态路由后，添加动态路由然后放行，
   * */
    const hasToken: string | null = settings.isNeedLogin ? getToken() : 'temp_token'
    if (hasToken) {
      if (to.path === '/login') {
      // if is logged in, redirect to the home page
        next({
          path: '/',
        })
      } else {
      // 是否获取过用户信息
      // eslint-disable-next-line no-lonely-if
        if (permissionStore.isGetUserInfo) {
          next()
        } else {
          try {
            let accessRoutes = <RouterTy>[]
            if (settings.isNeedLogin) {
              // get user info
              const data: any = await userStore.getInfo()
              const isAdmin = data.admin === 1 || data.small_admin === 1
              accessRoutes = await permissionStore.generateRoutes()
              if (settings.filterNav) {
                accessRoutes = filterNav(asyncRoutes, data.navList || [], isAdmin)
              }
            } else {
              accessRoutes = asyncRoutes
            }
            permissionStore.setRoutes(accessRoutes)
            // dynamically add accessible routes
            // router4 addRoutes destroyed
            accessRoutes.forEach((route: RouterRowTy) => {
              router.addRoute(route)
            })
            // already get userInfo
            permissionStore.setIsGetUserInfo(true)
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({
              ...to, replace: true,
            })
          } catch (err) {
            console.log('err: ', err)
            redirectLogin()
            next(false)
            if (settings.isNeedNprogress) NProgress.done()
          }
        }
      }
    } else if (whiteList.includes(to.path)) {
      next()
    } else {
      redirectLogin()
      next(false)
      if (settings.isNeedNprogress) NProgress.done()
    }
  })

  router.afterEach(() => {
    if (settings.isNeedNprogress) NProgress.done()
  })
}
