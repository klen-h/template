export function getOptionsFromMap(propMap, { number = false, all = true } = {}) {
  const options = Object.entries(propMap).map(([key, value]) => ({
    label: value,
    value: number ? +key : key,
  }))
  if (all) {
    options.unshift({
      label: '全部',
      value: '',
    })
    options.push(
      {
        label: '未知',
        value: number ? -1 : '-1',
      },
    )
  }
  return options
}

export function getColsFromPropMap(propMap) {
  return propMap.filter(([prop]) => prop).map(([prop, label]) => ({
    label, prop,
  }))
}

// 字节转换MB,如果不够1mb,则转换成kb
export function bytesToSize(bytes) {
  if (bytes === 0) return '0 B'
  const kUnit = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(kUnit))
  const num = bytes / kUnit ** i
  return `${num.toFixed(2)} ${sizes[i]}`
}

/**
 * @desc blob转file
 * @param theBlob
 * @param fileName
 */
export function blobToFile(theBlob, fileName) {
  // eslint-disable-next-line no-param-reassign
  theBlob.lastModifiedDate = new Date()
  // eslint-disable-next-line no-param-reassign
  theBlob.name = fileName
  return theBlob
}

/**
 * @desc base64转blob
 * @param base64
 */
export function base64ToBlob(base64) {
  const binaryString = window.atob(base64.split(',')[1])
  const { length } = binaryString
  const binaryArray = new Uint8Array(length)
  for (let i = 0; i < length; i++) { binaryArray[i] = binaryString.charCodeAt(i) }
  return new Blob([binaryArray], {
    type: 'image/jpg',
  })
}
