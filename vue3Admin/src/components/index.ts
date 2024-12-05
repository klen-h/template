// svg-icon
// import svg-icon doc in  https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'
import { ObjTy } from '@/types/common'

const components: ObjTy = {
  svgIcon,
}

export default {
  install(app: import('vue').App<any>) {
    Object.keys(components).forEach((key) => {
      app.component(components[key].name, components[key])
    })
  },
}
