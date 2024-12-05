import { ElMessage } from 'element-plus'

const showElMessage = (message, type, duration = 3000) => ElMessage({
  type,
  message,
  duration,
})

export const showLoadingMessage = (message = '提交中...') => showElMessage(message, 'info', 0)

export const showSucessMessage = (message = '操作成功') => showElMessage(message, 'success')

export const showErrorMessage = (message, { isCover = false } = {}) => showElMessage(isCover ? message : `操作失败: ${message}`, 'error')

export const showWarnMessage = (message: string) => showElMessage(message, 'warning')
