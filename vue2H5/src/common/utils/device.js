const ua = navigator.userAgent
const isAndroid = /Android\s+([\d.]+)/.test(ua)
const isIos = /(?:iPad|iPhone).*OS\s([\d_]+)/.test(ua) && !isAndroid
const isChrome = ua.toLowerCase().indexOf('chrome') > -1
const isSafari = ua.toLowerCase().indexOf('safari') > -1 && !isChrome
const isIphone = ua.indexOf('iPhone') > -1 && ua.indexOf('Version') > -1
const isIPadOS = /ipad/i.test(ua)
  || (navigator.platform && navigator.platform.toLocaleLowerCase() === 'macintel' && navigator.maxTouchPoints > 1)
  || (isSafari && !isIphone && 'ontouchend' in document)

let isMobile = isAndroid || isIos || isIPadOS
const isWeixin = /micromessenger/.test(ua.toLowerCase())
const isQQ = /QQBrowser/.test(ua)
const isFirfox = ua.toLowerCase().indexOf('firefox') > -1
const isEdge = ua.toLowerCase().indexOf('edg') > -1
const isIE = ua.toLowerCase().includes('msie') || ua.toLowerCase().includes('trident')
const isWindows = ua.toLowerCase().includes('windows')
const isMac = ua.toLowerCase().includes('macintosh')
const isDingTalk = ua.toLowerCase().includes('dingtalk')
if (window.innerWidth > 768 && !isIPadOS) {
  isMobile = false
}

export default {
  isAndroid,
  isIos,
  isIPadOS,
  isMobile,
  isWeixin,
  isQQ,
  isChrome,
  isSafari,
  isFirfox,
  isEdge,
  isIE,
  isWindows,
  isMac,
  isDingTalk,
}
