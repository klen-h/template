// global css
import '@/styles/index.scss'
import '@/plugins/amfe-flexible'
import { createApp } from 'vue'
import App from './App.vue'
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App)

// import i18n from '@/i18n/index'

// app.use(i18n)

import { createAppRouter } from './router'

// import 状态管理
import store from './store'

app.use(store)

import globalComponents from '@/components/index'

app.use(globalComponents)

app.use(VueLazyLoad, {})

// import globalDirectives from '@/directives/index'

// app.use(globalDirectives)

// global mount moment-mini
// import $momentMini from 'moment-mini'
// app.config.globalProperties.$momentMini = $momentMini

// import router  intercept
// import { setupPermission } from './permission'

const router = createAppRouter()

// setupPermission(router)

app
  .use(router)
  .mount('#app')
