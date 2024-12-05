const PROJECT_CONFIG = require('../../project_config')

const docEl = document.documentElement
const dpr = window.devicePixelRatio || 1

// set 1rem = viewWidth / 10
const setRemUnit = () => {
  const { innerWidth } = window
  const isMobile = innerWidth <= 768
  const num = innerWidth > 768 ? 375 / 1920 : 1
  const maxWidth = 3840
  const minWidth = 320
  if (isMobile || (innerWidth <= maxWidth && innerWidth >= minWidth)) {
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

if (PROJECT_CONFIG.ADAPTATION.includes('rem')) {
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
}
