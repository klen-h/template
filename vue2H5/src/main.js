/* eslint-disable global-require */
import '@/plugins/vant-ui'
import globalComponents from '@/components/index'
import globalDirectives from '@/directives/index'
import globalFilters from '@/filters/index'
import '@/plugins/amfe-flexible'
import '@/styles/reset.scss'
import '@/styles/transition.scss'
import '@/styles/app.scss'

import Vue from 'vue'
import { uploadStatics } from '@/common/utils/app-adaptation'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$pushEvent = uploadStatics

Vue.use(globalComponents)
Vue.use(globalDirectives)
Vue.use(globalFilters)

const isDark = window.location.href.includes('dark=1')
if (isDark) {
  document.documentElement.classList.add('dark')
}

new Vue({
  router: require('./router').default,
  store: require('./store').default,
  render: (h) => h(App),
}).$mount('#app')
