// import { setRequestToken, setRequestUDID } from '@/utils/request'

export const getUser = async () => new Promise((resolve, reject) => {
  // 获取用户信息接口
  try {
    resolve(null)
  } catch (error) {
    reject()
  }
})

export function redirectLogin() {
  // ElMessageBox.confirm('请重新登录', {
  //   title: '当前未登录或登录已过期',
  //   confirmButtonText: '重新登录',
  //   cancelButtonText: '取消',
  //   type: 'warning',
  // })
  //   .then(() => {
  //     window.location.href = `${window.location.href.includes('https') ? 'https' : 'http'}://admin-upper.jin10.com/#/login?redirect_url=${encodeURIComponent(window.location.href)}`
  //   })
  //   .catch(() => {
  //     console.log('取消重新登录')
  //   })
}
