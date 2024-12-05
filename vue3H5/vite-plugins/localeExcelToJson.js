import { read, utils } from 'xlsx'
import { readFileSync, writeFile } from 'fs'
import { resolve } from 'path'

const transformFile = (input, ouput) => {
  const buf = readFileSync(input)
  const workbook = read(buf, {
    type: 'array',
  })
  if (workbook.SheetNames.length) {
    const json = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
      header: ['short', 'chinese', 'english'],
    }).slice(1)
    const en = {}
    const zh = {}
    json.forEach(({ short, english, chinese }) => {
      en[short] = english
      zh[short] = chinese
    })
    writeFile(resolve(ouput, './en.ts'), `export default ${JSON.stringify(en, null, 2)} as const\n`, (err) => {
      if (err) {
        console.error(err)
      }
    })
    writeFile(resolve(ouput, './zh.ts'), `export default ${JSON.stringify(zh, null, 2)} as const\n`, (err) => {
      if (err) {
        console.error(err)
      }
    })
  }
}

export function localeExcelToJson(option) {
  return {
    name: 'locale-excel-to-json',
    buildStart() {
      transformFile(resolve(process.cwd(), option.input), resolve(process.cwd(), option.ouput))
    },
    handleHotUpdate(ctx) {
      if (ctx.file === resolve(process.cwd(), option.input)) {
        transformFile(resolve(process.cwd(), option.input), resolve(process.cwd(), option.ouput))
      }
    },
  }
}
