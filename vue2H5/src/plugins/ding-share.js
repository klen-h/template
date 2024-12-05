import device from '@/common/utils/device'
import { loadScript } from '@/common/utils'

/**
 * 钉钉分享
 * @param {object}
 * link: 分享链接, 默认是当前url
 * imgUrl: 分享图片, 默认是设置的分享图环境变量
 * title: 分享标题, 默认是document.title
 * desc: 分享描述, 默认是当前url
 */
export default function setDingShare({
  link = window.location.href,
  imgUrl = process.env.VUE_APP_SHAREPIC,
  title = document.title,
  desc = window.location.href,
} = {}) {
  if (!device.isDingTalk) return
  loadScript(
    'https://g.alicdn.com/dingding/open-develop/1.9.0/dingtalk.js',
  ).then(() => {
    window.dd.ready(() => {
      console.log('ding talk is ready')
      window.dd.biz.navigation.setRight({
        show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
        control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
        text: '...', // 控制显示文本，空字符串表示显示默认文本
        onSuccess() {
          // 如果control为true，则onSuccess将在发生按钮点击事件被回调
          window.dd.biz.util.share({
            type: 0, // 分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: link,
            content: desc,
            title,
            image: imgUrl,
            onSuccess() {},
            onFail() {},
          })
        },
        onFail() {},
      })
    })
  })
}
