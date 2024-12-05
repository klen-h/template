import { PropType } from 'vue'

export type BaseFormItemConfig = {
  [keyName: string]: {
    input?: 'select' | 'date-picker' | 'input-number' | 'load-select' | undefined
    options?: {
      label: string | unknown
      value: any;
    }[],
    inputProps?: object
  }
}

export type PropItem = string[]

export const baseFormProps = {
  propMap: {
    type: Array as unknown as PropType<PropItem[]>,
    default: () => [],
    required: true,
  },
  config: {
    type: Object,
  },
  edit: Boolean,
  rules: {
    type: Object,
    default: () => ({}),
  },
  labelWidth: {
    type: [String, Number],
    default: 140,
  },
  labelPostion: {
    type: String,
    validator(val) {
      return ['left', 'right', 'top'].includes(val)
    },
    default: 'right',
  },
  model: {
    type: Object,
    default: () => ({}),
  },
  showFormFooter: {
    type: Boolean,
    default: true,
  },
  // 默认响应式布局,传true则宽度占满,可套一层父元素来满足定制化的响应式
  isFullWidth: Boolean,
}
