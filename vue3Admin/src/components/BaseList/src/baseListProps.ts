import { FilterItem } from '@/components/BaseFilter'
import { PropType } from 'vue'

const noop = (data) => data

export type TableMoreActionItem = {
  name: string
  onClick: (row: object) => void
}

export const baseListProps = {
  valuePropMap: {
    type: Object,
    default: () => ({}),
  },

  filterItems: {
    type: Array as PropType<FilterItem[]>,
    default: () => [],
  },

  editFunc: {
    type: Function,
    default: noop,
  },

  showEdit: {
    type: Boolean,
    default: true,
  },
  showOverflowTooltip: Boolean,
  showTooltipProps: {
    type: Array,
    default: () => [],
  },
  linkProps: {
    type: Array,
    default: () => [],
  },
  fixedLeft: {
    type: Boolean,
    default: false,
  },
  filterNumberKeys: {
    type: Array,
    default: () => [],
  },
  excludeQuery: {
    type: Array,
    default: () => [],
  },
  sortableProps: {
    type: Array,
    default: () => [],
  },
  showDelete: Boolean,

  deleteRequest: {
    type: Function,
  },
  colConfig: {
    type: Object,
  },

  tableActionWidth: {
    type: Number,
    default: undefined,
  },
  onEdit: Function,
  tableMoreActions: {
    type: Array as PropType<TableMoreActionItem[]>,
    default: () => [],
  },
  align: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'left',
  },
  showSelection: {
    type: Boolean,
    default: false,
  },
}
