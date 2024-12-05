/*page common ts*/
import { RouteRecordRaw, RouteLocationMatched } from 'vue-router'

/*此处扩展的类型*/
interface RouteItemTy {
  hidden?: boolean
  name?: string
  fullPath?: string
  path?: string
  meta?: {
    title: string
    icon?: string
    requiresAuth?: Boolean
  }
  children?: RouterTy
  redirect?: string
}

type RouteLocationMatchedItem = RouteLocationMatched | RouteItemTy
type RouterRowTy = RouteRecordRaw & RouteItemTy
type RouterTy = Array<RouterRowTy>
