/*page common ts*/
import { RouteRecordRaw, RouteLocationMatched } from 'vue-router'

/*此处扩展的类型*/
interface RouteItemTy {
  hidden?: boolean
  alwaysShow?: boolean
  name?: string
  fullPath?: string
  path?: string
  meta?: {
    title: string
    icon?: string
    affix?: boolean
    activeMenu?: string
    breadcrumb?: boolean
    roles?: Array<string>
    elSvgIcon?: string
    auth?: string
  }
  children?: RouterTy
  redirect?: string
}

type RouteLocationMatchedItem = RouteLocationMatched | RouteItemTy
type RouterRowTy = RouteRecordRaw & RouteItemTy
type RouterTy = Readonly<RouterRowTy[]>
