<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <el-card
    class="base-table-wrapper"
  >
    <div
      ref="toolbarRef"
      class="base-table-toolbar flex justify-between items-center"
    >
      <div class="base-table-toolbar__left">
        <slot name="toolbarLeft" />
      </div>
      <div class="base-table-toolbar__right">
        <slot name="toolbarRight" />
        <div class="base-table-toolbar__default">
          <!-- 刷新 -->
          <el-tooltip
            content="刷新"
            placement="top"
          >
            <el-icon
              class="cursor-pointer"
              :size="18"
              @click="refresh(false)"
            >
              <Refresh />
            </el-icon>
          </el-tooltip>
          <!-- 密度 -->
          <el-dropdown
            popper-class="table-size-dropdown"
            @command="onTableSizeCommand"
          >
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="option in tableSizeOptions"
                  :key="option.name"
                  :command="option.name"
                  :class="{
                    'is-active': tableSize === option.name
                  }"
                >
                  <div
                    :style="tableSize === option.name ? {
                      color: '#409EFF',
                    }: {
                    }"
                  >
                    {{ option.label }}
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
            <!-- fix 无法展开dropdown -->
            <div>
              <el-tooltip
                content="密度"
                placement="top"
              >
                <el-icon
                  class="cursor-pointer"
                  :size="18"
                >
                  <column-height-outlined />
                </el-icon>
              </el-tooltip>
            </div>
          </el-dropdown>
          <!-- 列配置 -->
          <base-table-column-setting />
        </div>
      </div>
    </div>
    <div
      ref="baseTableMainRef"
      class="base-table-main"
    >
      <el-table
        ref="tableRef"
        v-loading="loading"
        height="100%"
        :data="tableData"
        :border="props.border"
        :size="tableSize"
        @sort-change="onSortChange"
        @selection-change="handleSelectionChange"
      >
        <slot />
      </el-table>
      <div
        ref="pageRef"
        style="padding-top: 15px;"
        class="flex"
        :class="{
          'justify-end': !props.isDirectionPage,
          'justify-center': props.isDirectionPage
        }"
      >
        <el-pagination
          v-if="!props.isDirectionPage"
          :current-page="page"
          :page-size="pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="onCurrentChange"
          @size-change="onSizeChange"
        />

        <div
          v-else
          class="flex justify-center items-center"
        >
          <el-button-group>
            <el-button
              :disabled="offset === 0"
              :icon="ArrowLeft"
              @click="prevClick"
            >
              上一页
            </el-button>
            <el-button
              size="mini"
              :disabled="tableData.length < pageSize || nextDisabled"
              @click="nextClick"
            >
              下一页<el-icon class="ml-5">
                <arrow-right />
              </el-icon>
            </el-button>
          </el-button-group>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
/* eslint-disable vue/no-mutating-props */

import useOnAppMainResize from '@/hooks/useOnAppMainResize'
import {
  computed,
  nextTick,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { baseTableProps } from './baseTableProps'
import {
  Refresh, ArrowLeft, ArrowRight,
} from '@element-plus/icons-vue'
import { ColumnHeightOutlined } from '@vicons/antd'
import { useTableStore } from '@/store/table'
import BaseTableColumnSetting from './BaseTableColumnSetting.vue'

const props = defineProps({
  ...baseTableProps,
})

const route = useRoute()
const router = useRouter()

const tableStore = useTableStore()
// eslint-disable-next-line no-use-before-define
readURLQuery()

const {
  page: queryPage,
  pageSize: queryPageSize,
  offset: queryOffset,
  direction: queryDirection,
} = route.query

const tableRef = ref()

const tableSize = computed(() => tableStore.tableSize)

const page = ref(+(queryPage || 1))
// eslint-disable-next-line vue/no-setup-props-destructure
const pageSize = ref(+queryPageSize || props.initPageSize)
const total = ref(0)

const direction = ref(queryDirection || 'down')
const offset = ref(+queryOffset || 0)
const [nextDisabled, { toggle: toggleNextDisabled }] = useBoolean()

const [loading, { toggle: toggleLoading }] = useBoolean()

const tableData = ref([])

const toolbarRef = ref()
const baseTableMainRef = ref()
const pageRef = ref()

const order = ref(route.query.order)
const orderProp = ref(route.query.orderProp)
const hasOrder = computed(() => !!(order.value && orderProp.value))

const tableSizeOptions = [
  {
    label: '紧凑', name: 'small',
  },
  {
    label: '默认', name: 'default',
  },
  {
    label: '宽松', name: 'large',
  },
]

async function fetchData() {
  const pageData = props.pageAdapter({
    page: page.value,
    pageSize: pageSize.value,
  })
  let params = props.isDirectionPage
    ? {
      direction: direction.value,
      offset: offset.value,
      ...pageData,
      ...props.filter,
    }
    : {
      ...pageData,
      ...props.filter,
    }
  if (order.value && orderProp.value) {
    params.order = order.value
    params.orderProp = orderProp.value
  }
  try {
    toggleLoading(true)
    if (props.beforeRequest) {
      params = props.beforeRequest(params, {
        order: order.value,
        orderProp: orderProp.value,
      })
    }
    Object.entries(params).forEach(([key, value]) => {
      if (!value && value !== 0) {
        delete params[key]
      }
    })
    // 注意点说明: 如果data的结构是 { list: [], total: 0 }, 使用时就不需要传入 resAdapter, 反之 resAdapter 需要返回此结构的数据
    const { data } = await props.fetcher(params)
    console.log('data: ', data)
    const { list, total: _total } = props.resAdapter(data)
    if (direction.value === 'up' && list.length === 0) {
      // 上一页已经没有数据,说明处于第一页
      offset.value = 0
    } else if (direction.value === 'down' && list.length === 0 && offset.value !== 0) {
      // 最后一页
      toggleNextDisabled(true)
    } else {
      tableData.value = list
      total.value = _total
    }
    toggleLoading(false)
    // eslint-disable-next-line no-use-before-define
    updateRouteQuery()
  } catch (error) {
    toggleLoading(false)
    console.log(error)
  }
}

function refresh(reset = true) {
  if (loading.value) return
  if (reset) {
    page.value = 1
    offset.value = 0
  }
  fetchData()
}

function onCurrentChange(val) {
  page.value = val
  fetchData()
}
function onSizeChange(size) {
  page.value = 1
  pageSize.value = size
  fetchData()
}

function updateRouteQuery() {
  const { query, path } = route
  const newQuery:any = {
    ...query,
    ...props.filter,
    ...props.isDirectionPage ? {
      direction: direction.value,
      offset: offset.value,
    } : {
      page: page.value,
    },
    pageSize: pageSize.value,
  }
  if (hasOrder.value) {
    newQuery.order = order.value
    newQuery.orderProp = orderProp.value
  } else {
    delete newQuery.order
    delete newQuery.orderProp
  }
  Object.entries(newQuery).forEach(([key, value]) => {
    if ((!value) || props.excludeQuery.includes(key)) {
      delete newQuery[key]
    }
  })
  router.push({
    path,
    query: {
      ...newQuery,
    },
  })
}

function getDataId(data) {
  if (data.id !== void 0) return data.id
  if (data.info_an_id !== void 0) return data.info_an_id
  return ''
}
function prevClick() {
  direction.value = 'up'
  if (tableData.value.length) {
    offset.value = getDataId(tableData.value[0])
  }
  fetchData()
}
function nextClick() {
  direction.value = 'down'
  if (tableData.value.length) {
    offset.value = getDataId(tableData.value[tableData.value.length - 1])
  }
  fetchData()
}
function onSortChange({ prop, order: _order }) {
  orderProp.value = prop
  order.value = _order
  fetchData()
}
const multipleSelection = ref<[]>([])
function handleSelectionChange(val: []) {
  multipleSelection.value = val
  props.onSelectionChange(val)
}
function readURLQuery() {
  Object.entries(route.query).forEach(([key, value]) => {
    if (key in props.filter) {
      if (!props.excludeQuery.includes(key)) {
        // eslint-disable-next-line vue/no-mutating-props
        props.filter[key] = props.filterNumberKeys.length && props.filterNumberKeys.includes(key)
          ? +value
          : value
      }
    }
  })
}
function resetOrder() {
  order.value = null
  orderProp.value = null
  tableRef.value.clearSort()
}

function onTableSizeCommand(size) {
  tableStore.setTableSize(size)
}

function updateHeight() {
  const toolbarHeight = unref(toolbarRef) ? unref(toolbarRef).offsetHeight : 0
  const pageHeight = unref(pageRef) ? unref(pageRef).offsetHeight : 0
  if (unref(baseTableMainRef)) {
    unref(baseTableMainRef).style = `height: calc(100% - ${toolbarHeight + pageHeight}px)`
  }
}

onMounted(() => {
  if (!props.autoFetch) {
    return
  }
  if (hasOrder.value) {
    nextTick(() => {
      tableRef.value.sort(orderProp.value, order.value)
    })
  } else {
    fetchData()
  }
})

useOnAppMainResize(() => {
  updateHeight()
})

defineExpose({
  toolbarRef,
  refresh,
  resetOrder,
  tableRef,
  updateHeight,
})
</script>

<style lang="scss" scoped>

.base-table-wrapper {
  height: 100%;
  :deep(.#{$namespace}-card__body) {
    height: 100%;
  }
}
.base-table {
  &-toolbar {
    padding-bottom: 16px;
    &__default {
      .#{$namespace}-icon {
        margin-left: 12px;
      }
    }
  }
}
.cursor-pointer {
  cursor: pointer;
}

</style>
