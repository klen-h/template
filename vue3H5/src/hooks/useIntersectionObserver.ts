import { unrefElement, MaybeElementRef } from '@vueuse/core'

function useIntersectionObserver(
  target: MaybeElementRef,
  callback: IntersectionObserverCallback,
  {
    rootMargin = '0px 0px',
    root = null,
    threshold = [0, 0.25, 0.5, 0.75],
  } = {},
) {
  const isSupported = window && 'IntersectionObserver' in window

  let io = null
  const startObserve = () => {
    console.log('startObserve')
    const el = unrefElement(target)
    const rootEl = unrefElement(root)
    io = new window.IntersectionObserver(callback, {
      rootMargin,
      root: rootEl,
      threshold,
    })
    io.observe(el)
  }

  const stopObserve = () => {
    console.log('stopObserve')
    if (io) {
      console.log('disconnect')
      io.disconnect()
    }
  }

  onBeforeUnmount(() => {
    console.log('onBeforeUnmount')
    if (io) {
      const el = unrefElement(target)
      console.log('unobserve')
      io.unobserve(el)
      io = null
    }
  })

  return {
    isSupported,
    startObserve,
    stopObserve,
  }
}
export { useIntersectionObserver }
