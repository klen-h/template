import 'virtual:uno.css'
// global css
import '@/styles/index.scss'
import settings from './settings'
import { createApp } from 'vue'
import App from './App.vue'
import '../mock/table'

let app = createApp(App)

// 错误日志
import errorLog from '@/hooks/errorLogHook'

errorLog()

import { createAppRouter, childAppRoutes } from './router'

// import 状态管理
import store from './store'
import { useLayoutStore } from './store/layout'

app.use(store)

// import element-plus
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

app.use(ElementPlus)

import globalComponents from '@/components/index'

app.use(globalComponents)

import globalDirectives from '@/directives/index'

app.use(globalDirectives)

// import router  intercept
import { setupPermission } from './permission'

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let router
function render(props?) {
  const { container } = props || {}
  router = createAppRouter(!!container)

  setupPermission(router)

  if (container) {
    const layoutStore = useLayoutStore()
    layoutStore.changeLayoutMode(true)
  }

  app
    .use(router)
    .mount(container ? container.querySelector('#app') : '#app')
}

import { getUserinfo } from '@/api/user'
import filterNav from '@/router/filter-nav'
import { RouterTy } from '@/types/router'

renderWithQiankun({
  mount(props) {
    console.log(`[${settings.childAppName}] mount`)
    getUserinfo().then(({ data }) => {
      const { navList = [], admin, small_admin: smallAdmin } = data
      const isAdmin = admin === 1 || smallAdmin === 1
      props.setGlobalState({
        globalConfig: {
          appName: settings.childAppName,
          routes: filterNav(childAppRoutes as RouterTy, navList, isAdmin),
        },
      })
    })

    render(props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount() {
    console.log('unmount')
    app = null
    router = null
  },
  update() {
    console.log('update')
  },
})

// eslint-disable-next-line no-underscore-dangle
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}
