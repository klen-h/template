/* eslint-disable object-curly-newline */
// import { parseTime } from "@/common/utils/index";

export const filters = {
  // dateTime: (val) => parseTime(val, "{m}-{d} 星期{a} {h}:{i}:{s}"),
}

export default function (Vue) {
  Object.keys(filters).forEach((name) => {
    Vue.filter(name, filters[name])
  })
}
