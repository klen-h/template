import device from '@/utils/device'

const docEl = document.documentElement
const dpr = window.devicePixelRatio || 1

// set 1rem = viewWidth / 10
const setRemUnit = () => {
  // 注意点说明: rem最大适配到此宽度,此时应给最外层的容器#app设置width:100vw;max-width:540PX;margin:0 auto;
  const { innerWidth } = window
  const num = innerWidth > 768 ? 414 / 1920 : 1
  const maxWidth = 3840
  const minWidth = 320
  if (device.isMobile || (innerWidth <= maxWidth && innerWidth >= minWidth)) {
    const rem = (docEl.clientWidth / 10) * num
    docEl.style.fontSize = `${rem}px`
  } else if (innerWidth <= minWidth) {
    docEl.style.fontSize = `${minWidth / 10}px`
  } else {
    docEl.style.fontSize = `${(maxWidth / 10) * num}px`
  }
}

const pageshowFunc = (event) => {
  if (event.persisted) {
    setRemUnit()
  }
}

// adjust body font size
// eslint-disable-next-line no-unused-vars
function setBodyFontSize() {
  if (document.body) {
    document.body.style.fontSize = `${12 * dpr}px`
  } else {
    document.addEventListener('DOMContentLoaded', setBodyFontSize)
  }
}

setBodyFontSize()
setRemUnit()

// reset rem unit on page resize
window.addEventListener('resize', setRemUnit)
window.addEventListener('pageshow', pageshowFunc)

// detect 0.5px supports
if (dpr >= 2) {
  const fakeBody = document.createElement('body')
  const testElement = document.createElement('div')
  testElement.style.border = '.5px solid transparent'
  fakeBody.appendChild(testElement)
  docEl.appendChild(fakeBody)
  if (testElement.offsetHeight === 1) {
    docEl.classList.add('hairlines')
  }
  docEl.removeChild(fakeBody)
}
