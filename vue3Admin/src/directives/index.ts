// import permission from './permission'
import { ObjTy } from '@/types/common'
import loadmore from './loadmore'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const directives: ObjTy = {}

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install(app: import('vue').App<any>) {
    app.directive('loadmore', loadmore)
    // app.directive('permission', permission)
  },
}
