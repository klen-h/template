const mdToJs = (str) => {
  const content = JSON.stringify(str)
  return `export default ${content}`
}

export function md() {
  return {
    name: 'transform-markdown',
    // eslint-disable-next-line consistent-return
    transform(src, id) {
      if (/\.(md)$/.test(id)) {
        return {
          code: mdToJs(src),
          map: null, // 如果可行将提供 source map
        }
      }
    },
  }
}
