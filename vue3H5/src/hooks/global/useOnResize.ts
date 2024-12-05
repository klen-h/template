import { debounce } from 'lodash-es'
import { off, on } from '@/utils/dom'

function useOnResize(fn, time = 100) {
  onMounted(() => {
    on(window, 'resize', debounce(fn, time))
  })
  onUnmounted(() => {
    off(window, 'resize', debounce(fn, time))
  })
}
export { useOnResize }
