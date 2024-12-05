const childProcess = require('child_process')

const now = new Date()

function format(val) {
  return `${val}`.length > 1 ? `${val}` : `0${val}`
}
function pushTag(name) {
  childProcess.execSync(`git tag ${name}`)
  childProcess.execSync(`git push origin ${name}`)
}

const month = format(now.getMonth() + 1)
const day = format(now.getDate())
const hour = format(now.getHours())
const min = format(now.getMinutes())

const tagType = 'release'
const tagDate = `${month + day}_${hour}${min}`
const tagName = `${tagType}_${tagDate}`
pushTag(tagName)
console.log('push tag -->', tagName)
