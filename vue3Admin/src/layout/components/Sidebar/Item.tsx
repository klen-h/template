/* 使用vue3.0 jsx语法书写 */
import { defineComponent } from 'vue'
import ElSvgItem from './ElSvgItem.vue'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: '',
    },
    meta: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    elIcon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    /* 此处写法像极了react */
    const renderItem = () => {
      if (props.meta?.elSvgIcon) {
        // using element-plus svg icon
        // element-plus remove el-icon,using 'svg icon'  to replace
        // view https://element-plus.org/zh-CN/component/icon.html
        return <div class="nav-icon"><ElSvgItem size="15" elSvgName={props.meta.elSvgIcon} /></div>
      } if (props.meta?.icon) {
        // console.log('我进入渲染了')
        return <div class="nav-icon"><svg-icon icon-class={props.meta?.icon} /></div>
      }
      return null
    }
    return () => renderItem()
    // return () => (
    //   <div>{renderItem()}</div>
    // )
  },
})
