import wechatShareConfig from '@/plugins/wechatShareConfig' // 微信分享
import setDingShare from '@/plugins/ding-share' // 钉钉分享
import { isTestEnv } from '@/common/constant'

/**
 * 大数据行为上报
 * @param {object} 参数对象
 * pageName:页面名称(默认document.title)
 * module:模块名称(默认null)
 * action:操作名称(默认点击)
 * type:操作类型(默认按钮)
 * object:操作对象(默认null)
 * params:操作对象参数(默认null)
 */
export const uploadStatics = ({
  pageName = document.title,
  module = null,
  action = '点击',
  type = '按钮',
  object = null,
  params = null,
} = {}) => {
  // 普通Web调用
  const staticParams = {
    pageName,
    module,
    action,
    type,
    object,
    params,
  }
  if (isTestEnv) {
    console.log(staticParams)
  }
}

/**
 * 初始化分享
 * @param {object} option
 * option.link:【分享链接，默认值:location.href】
 * option.imgUrl:【分享icon，默认值:process.env.VUE_APP_SHAREPIC】
 * option.title:【分享标题，默认值:dprocess.env.VUE_APP_TITLE】
 * option.desc:【分享描述，默认值:process.env.VUE_APP_DESC】
 */
export const initShare = async ({
  link = window.location.href,
  imgUrl = process.env.VUE_APP_SHAREPIC,
  title = process.env.VUE_APP_TITLE,
  desc = process.env.VUE_APP_DESC,
} = {}) => {
  const shareOption = {
    link,
    imgUrl,
    title,
    desc,
  }
  wechatShareConfig(shareOption) // 微信分享
  setDingShare(shareOption) // 钉钉分享
}
