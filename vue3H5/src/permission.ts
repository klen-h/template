import { useUserStore } from '@/store/user'
import settings from './settings'
import { redirectLogin, getPageTitle } from '@/utils/index'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false,
})
import 'nprogress/nprogress.css'

export function setupPermission(router) {
  const whiteList = ['/login']
  router.beforeEach(async (to: any, from, next: any) => {
    const userStore = useUserStore()
    // start progress bar
    if (settings.isNeedNprogress) NProgress.start()
    // set page title
    document.title = getPageTitle(to.meta.title)

    if (whiteList.includes(to.path)) {
      next()
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
      try {
        await userStore.getUser()
        next()
      } catch (error) {
        redirectLogin()
        if (settings.isNeedNprogress) NProgress.done()
        next(false)
      }
    } else {
      next()
    }
  })

  router.afterEach(() => {
    if (settings.isNeedNprogress) NProgress.done()
  })
}
