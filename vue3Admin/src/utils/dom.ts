/* istanbul ignore next */

export const hasClass = (ele, cls) => ele.getAttribute('class') && ele.getAttribute('class').indexOf(cls) > -1

export const on = ((() => {
  if (document.addEventListener) {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  }
  return (element, event, handler) => {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler)
    }
  }
})())

/* istanbul ignore next */
export const off = ((() => {
  if (document.removeEventListener) {
    return (element, event, handler) => {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  }
  return (element, event, handler) => {
    if (element && event) {
      element.detachEvent(`on${event}`, handler)
    }
  }
})())

export const addClass = (ele, cls) => {
  if (ele.classList) {
    ele.classList.add(cls)
  } else if (!hasClass(ele, cls)) {
    ele.setAttribute('class', `${ele.getAttribute('class')} ${cls}`)
  }
}

export const removeClass = (ele, cls) => {
  if (ele.classList) {
    ele.classList.remove(cls)
  } else if (hasClass(ele, cls)) {
    ele.setAttribute('class', ele.getAttribute('class').replace(cls, ' '))
  }
}

/** 元素是否已经滚动到底部 */
export function isScrollToBottom(el, { offset = 20 } = {}) {
  return el.clientHeight + el.scrollTop >= el.scrollHeight - offset
}
