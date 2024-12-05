import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router'
import { PermissionTy } from '@/types/store'
import { RouteItemTy, RouterTy } from '@/types/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: Array<string>, route: RouteItemTy) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta?.roles?.includes(role))
  }
  return true
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouterTy, roles: Array<string>) {
  const res = []
  routes.forEach((route) => {
    const tmp = {
      ...route,
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        Object.assign(tmp, {
          children: filterAsyncRoutes(tmp.children, roles),
        })
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore({
  id: 'permission', // id必填，且需要唯一
  state: (): PermissionTy => ({
    isGetUserInfo: false, // get userInfo
    routes: [], // 将过滤后的异步路由和静态路由集合
    addRoutes: [], // 过滤后的异步路由
  }),
  actions: {
    setRoutes(routes: RouterTy) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    setIsGetUserInfo(data: boolean) {
      this.isGetUserInfo = data
    },
    generateRoutes(roles: Array<string> = []) {
      let accessedRoutes
      // filter by role
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      return accessedRoutes
    },
  },
})
