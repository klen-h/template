/** 上市状态 */
export const LIST_STATUS_MAP = Object.freeze({
  L: '上市',
  D: '退市',
  P: '暂停上市',
})

export const STOCK_PROP_MAP = Object.freeze([
  // ['short_name', '股票简称'],
  ['symbol', '股票代码.市场'],
  ['name', '股票名称'],
  ['company_type', '公司类型'],
  // ['company_type', '行业分类'],
  ['code', '股票代码'],
  ['exchange', '交易所代码'],
  ['cn_spell', '拼音缩写'],
  ['market', '市场类型'],
  ['currency', '币种'],
  ['list_status', '上市状态'],
  ['weight', '权重'],
  ['list_date', '上市时间'],
  ['delist_date', '退市时间'],
])

export const COMPANY_TYPE_TEXT = Object.freeze({
  1: '通用',
  2: '银行',
  3: '保险',
  4: '证券',
})

export const CURRENCY_TYPE = Object.freeze({
  USD: 'USD',
  HKD: 'HKD',
  CNY: 'CNY',
})

/** 市场类型 */
export const MARKET_TYPE = Object.freeze({
  主板: '主板',
  中小板: '中小板',
  创业板: '创业板',
  科创板: '科创板',
  CDR: 'CDR',
})
