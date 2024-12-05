<template>
  <el-select
    ref="selectRef"
    v-loadmore="{fetcher:loadMore, class: popperClass}"
    :class="{'load-select-multiple': multiple}"
    :model-value="modelValue"
    filterable
    remote
    remote-show-suffix
    clearable
    :popper-class="popperClass"
    :multiple="multiple"
    :allow-create="allowCreate"
    :filter-method="filterMethod"
    v-bind="$attrs"
    @focus="focus"
    @clear="clear"
    @change="onChange"
  >
    <el-option
      v-for="(option, index) in options"
      :key="option.value + '-' + option.label"
      :label="option.label"
      :value="option.value"
    >
      <slot :data="originData[index]">
        <span class="load-select-label">{{ option.label }}</span>
      </slot>
    </el-option>
  </el-select>
</template>
<script lang="ts" setup>
const props = defineProps({
  edit: Boolean,
  modelValue: {
    type: [String, Number, Array],
    default: '',
  },
  searchKey: {
    type: String,
    default: 'keyword',
  },
  fetcher: {
    type: Function,
    required: true,
  },
  labelKey: {
    type: String,
    default: 'name',
  },
  valueKey: {
    type: String,
    default: 'id',
  },
  autoFetch: Boolean,
  allowCreate: Boolean,
  multiple: Boolean,
})

const emits = defineEmits(['update:modelValue', 'change', 'select', 'clear'])

const page = ref(1)
const pageSize = ref(20)
const totalCount = ref(0)
const options = ref([])
const originData = ref([])
const popperClass = `select-popper_${Math.random().toString().replace('0.', '')}`
// 这个是存储编辑回显的值,因为要先请求一次包含这些值的数据,然后再拼接第一页数据,这些后请求的要过滤该值包含的避免重复
const hasLoadValues = ref([])

function convertOptions(list) {
  const { labelKey, valueKey } = props

  return list.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }))
}

const [loading, { toggle: toggleLoading }] = useBoolean()
const selectRef = ref()

async function fetchData({
  keyword = '',
  value = null,
  pageNo = page.value,
  isEditFirstLoad = false,
  isClear = false,
} = {}) {
  // 下一页数据会丢失keyword,因此直接从dom取输入值
  if (!isClear && keyword === '') {
    const inputValue = selectRef.value.$el.querySelector('input').value
    // eslint-disable-next-line no-param-reassign
    if (inputValue) keyword = inputValue
  }
  toggleLoading(true)
  const params = {
    page: pageNo,
    pageSize: pageSize.value,
    [props.searchKey]: keyword,
    [props.valueKey]: value,
  }
  const { data } = await props.fetcher(params)
  const { list, total } = data
  if (isEditFirstLoad) {
    hasLoadValues.value = isArray(value) ? value : [value]
    options.value = convertOptions(list)
    originData.value = list
  } else {
    totalCount.value = total
    if (hasLoadValues.value.length || ![0, 1].includes(pageNo)) {
      options.value = options.value.concat(convertOptions(list
        .filter((item) => !hasLoadValues.value.includes(item[props.valueKey]))))
      originData.value = originData.value.concat(list)
    } else {
      options.value = convertOptions(list)
      originData.value = list
    }
  }
  toggleLoading(false)
}

// 请求下一页的数据
function loadMore() {
  if (options.value.length < totalCount.value && !loading.value) {
    page.value++
    fetchData()
  }
}

// 选中下拉框没有数据时，自动请求第一页的数据
function focus() {
  if (!options.value.length) {
    fetchData()
  }
}

// 自定义筛选方法
function filterMethod(keyword) {
  page.value = 1
  hasLoadValues.value = []
  fetchData({
    keyword,
  })
}

// 选中值发生变化时触发
function onChange(val) {
  emits('update:modelValue', val)
  const find = originData.value.find((it) => it[props.valueKey] === val)
  if (find) {
    emits('select', find)
  }
  emits('change', val)
}

// 可清空的单选模式下用户点击清空按钮时触发
function clear() {
  page.value = 1
  hasLoadValues.value = []
  fetchData({
    isClear: true,
  })
  emits('clear')
  emits('update:modelValue', '')
}

defineExpose({
  clear,
})

onMounted(() => {
  // 使用Object.keys直接可以判断空字符串和空数组
  if (props.autoFetch || Object.keys(props.modelValue).length) {
    nextTick(() => {
      setTimeout(async () => {
        if (Object.keys(String(props.modelValue)).length) {
          await fetchData({
            value: props.modelValue,
            pageNo: 1,
            isEditFirstLoad: true,
          })
        }
        await fetchData({
          keyword: '',
          isClear: true,
        })
      }, 800)
    })
  }
})
</script>
<style lang="scss">
.load-select-multiple {
  min-width: 195px;
}
</style>
