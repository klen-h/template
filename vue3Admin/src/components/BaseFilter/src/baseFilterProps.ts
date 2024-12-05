import { PropType } from 'vue'

export type FilterItem = {
  label: string
  prop: string
  input? :string
  inputProps?: object,
  options?: any[],

}

export const baseFilterProps = {
  filter: {
    type: Object,
    default: () => ({}),
  },
  items: {
    type: Array as unknown as PropType<FilterItem[]>,
    default: () => [],
    required: true,
  },
  numberKey: {
    type: [String, Array],
    default: '',
  },
}
