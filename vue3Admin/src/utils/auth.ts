import Cookies from 'js-cookie'

const TokenKey = 'admin_token'
import { ElMessageBox } from 'element-plus'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function redirectLogin() {
  ElMessageBox.confirm('请重新登录', {
    title: '当前未登录或登录已过期',
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      window.location.href = ''
    })
    .catch(() => {
      console.log('取消重新登录')
    })
}
