import { useAppStore } from '@/store/app'
import {
  computed, nextTick, onMounted, watch,
} from 'vue'

export default function useOnAppMainResize(fn:() => void) {
  const appStore = useAppStore()

  const sideOpened = computed(() => appStore.$state.sidebar.opened)

  watch(sideOpened, () => {
    nextTick(() => {
      setTimeout(() => {
        fn()
      }, 300)
    })
  })

  onMounted(() => {
    fn()
  })

  useOnResize(() => {
    fn()
  })
}
