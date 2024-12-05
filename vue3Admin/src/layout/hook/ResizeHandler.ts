import {
  onBeforeMount, onMounted, onBeforeUnmount, watch, reactive,
} from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const { body } = document
const WIDTH = 992

export default () => {
  const appStore = useAppStore()

  const getIsMobile = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = getIsMobile()
      appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        appStore.closeSideBar({
          withoutAnimation: true,
        })
      }
    }
  }
  const useRouterCurrent = reactive(useRouter())
  watch(useRouterCurrent, () => {
    if (appStore.device === 'mobile' && appStore.sidebar.opened) {
      appStore.closeSideBar({
        withoutAnimation: true,
      })
    }
  })

  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onMounted(() => {
    const isMobile = getIsMobile()
    if (isMobile) {
      appStore.toggleDevice('mobile')
      appStore.closeSideBar({
        withoutAnimation: true,
      })
    }
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}
