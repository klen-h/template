import { debounce } from 'lodash-es'
import { off, on } from '@/utils/dom'

function useOnResize(fn) {
  onMounted(() => {
    on(window, 'resize', debounce(fn, 100))
  })
  onUnmounted(() => {
    off(window, 'resize', debounce(fn, 100))
  })
}
export { useOnResize }
