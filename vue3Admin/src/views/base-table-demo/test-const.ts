// 置顶位置
export const TOP_POS = Object.freeze({
  hot_flash: '大事',
})
/** 可用状态 */
export const ENABLED_TOP_STATUS_MAP = Object.freeze({
  0: '不可用',
  1: '可用',
  2: '待发布',
})

export const COL_CONFIG = {
  id: {
    label: 'ID',
    minWidth: 100,
    columnProps: {
      align: 'center',
      sort: true,
    },
  },
  name: {
    label: '姓名',
    minWidth: 175,
  },
  age: {
    label: '年龄',
    minWidth: 175,
  },
  gender: {
    label: '性别',
    minWidth: 175,
  },
  email: {
    label: 'email',
    minWidth: 300,
  },
  status: {
    label: '状态',
    inWidth: 300,
  },
}
