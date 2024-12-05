const noop = (data) => data
// import { PropType } from 'vue'

export const baseTableProps = {
  border: {
    type: Boolean,
  },
  height: [Number, String],
  maxHeight: [Number, String],
  fetcher: {
    type: Function,
    default: () => Promise.resolve(),
  },
  initPageSize: {
    type: Number,
    default: 10,
  },
  filter: {
    type: Object,
    default: () => ({}),
  },
  autoFetch: {
    type: Boolean,
    default: true,
  },
  resAdapter: {
    type: Function,
    default: noop,
  },
  pageAdapter: {
    type: Function,
    default: noop,
  },
  onRowClassName: {
    type: Function,
  },
  excludeQuery: {
    type: Array,
    default: () => [],
  },
  isDirectionPage: {
    type: Boolean,
    default: false,
  },
  beforeRequest: {
    type: Function,
  },
  filterNumberKeys: {
    type: Array,
    default: () => [],
  },
  onSelectionChange: Function,

}
