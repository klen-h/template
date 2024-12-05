// 复制文本
export default function copyText(str: string) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<void>(async (resolve, reject) => {
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(str)
        resolve()
      } catch (error) {
        reject(error)
      }
    } else {
      let input = window.document.getElementById('_copy_input_') as HTMLTextAreaElement
      if (!input) {
        input = window.document.createElement('textarea')
        input.setAttribute('style', 'height:10px;position:fixed;top:-1000px;left:-1000px;opacity:0;')
        input.setAttribute('id', '_copy_input_')
        input.setAttribute('readonly', '1')
        window.document.body.appendChild(input)
      }
      input.value = str
      input.select()
      const isSuccess = window.document.execCommand('Copy')
      isSuccess ? resolve() : reject()
    }
  })
}
