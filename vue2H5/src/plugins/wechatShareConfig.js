/* global wx */

import { loadScript } from '@/common/utils'
import device from '@/common/utils/device'

/**
 * 配置微信分享
 * @param {Object} parmas 选项
 * options.title 标题
 * options.desc 描述
 * options.imgUrl 封面
 * options.link 链接
 */
// eslint-disable-next-line consistent-return
export default function wechatShareConfig(parmas) {
  if (!device.isWeixin) {
    return false
  }
  const jssdk = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js' // https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#2
  const options = {
    link: document.location.href,
    onShareSuccess() {},
    onShareCancel() {},
    ...parmas,
  }
  Promise.all([
    loadScript(jssdk),
  ]).then(([{ data }]) => {
    console.log('data: ', data)
    wx.config({
      debug: false,
      appId: '', // 必填，公众号的唯一标识
      timestamp: '', // 必填，生成签名的时间戳
      nonceStr: '', // 必填，生成签名的随机串
      signature: '', // 必填，签名
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'updateTimelineShareData',
        'updateAppMessageShareData',
      ],
    })
    wx.ready(() => {
      // “分享到朋友圈”及“分享到QQ空间”
      wx.updateTimelineShareData({
        title: options.title, // 分享标题
        link: options.link, // 分享链接
        imgUrl: options.imgUrl, // 分享图标
        success() {
          options.onShareSuccess('timeline')
        },
      })
      // “分享给朋友”及“分享到QQ”
      wx.updateAppMessageShareData({
        title: options.title, // 分享标题
        link: options.link, // 分享链接
        imgUrl: options.imgUrl, // 分享图标
        desc: options.desc, // 描述
        success() {
          options.onShareSuccess('appMessage')
        },
      })
      wx.onMenuShareTimeline({
        title: options.title, // 分享标题
        link: options.link, // 分享链接
        imgUrl: options.imgUrl, // 分享图标
        success() {
          // 用户确认分享后执行的回调函数
          options.onShareSuccess('timeline')
        },
        cancel() {
          // 用户取消分享后执行的回调函数
          options.onShareCancel()
        },
      })
      wx.onMenuShareAppMessage({
        title: options.title, // 分享标题
        desc: options.desc, // 分享描述
        link: options.link, // 分享链接
        imgUrl: options.imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success() {
          // 用户确认分享后执行的回调函数
          options.onShareSuccess('appMessage')
        },
        cancel() {
          // 用户取消分享后执行的回调函数
          options.onShareCancel()
        },
      })
      wx.onMenuShareQQ({
        title: options.title,
        desc: options.desc,
        link: options.link,
        imgUrl: options.imgUrl,
        success() {
          // 用户确认分享后执行的回调函数
          options.onShareSuccess('qq')
        },
        cancel() {
          // 用户取消分享后执行的回调函数
          options.onShareCancel()
        },
      })
      wx.onMenuShareQZone({
        title: options.title,
        desc: options.desc,
        link: options.link,
        imgUrl: options.imgUrl,
        success() {
          // 用户确认分享后执行的回调函数
          options.onShareSuccess('qz')
        },
        cancel() {
          // 用户取消分享后执行的回调函数
          options.onShareCancel()
        },
      })
      wx.onMenuShareWeibo({
        title: options.title,
        desc: options.desc,
        link: options.link,
        imgUrl: options.imgUrl,
        success() {
          // 用户确认分享后执行的回调函数
          options.onShareSuccess('sina')
        },
        cancel() {
          // 用户取消分享后执行的回调函数
          options.onShareCancel()
        },
      })
    })
  })
}
