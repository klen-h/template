export const loadScript = (url: string, options = {
  async: false,
  defer: false,
  type: 'text/javascript',
}) => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = url
  script.async = options.async !== false //
  script.defer = options.defer || false //
  script.type = options.type || 'text/javascript'

  // 处理脚本加载完成和错误事件
  script.onload = () => resolve(script) //
  script.onerror = (event: Event | ErrorEvent) => reject(new Error(`Script load error for ${url}: ${(event as any).message}`))
  document.head.appendChild(script)
})
