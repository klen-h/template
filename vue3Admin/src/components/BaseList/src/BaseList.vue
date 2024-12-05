<template>
  <base-layout ref="layoutRef">
    <template
      v-if="props.filterItems && props.filterItems.length"
      #action
    >
      <BaseFilter
        :items="props.filterItems"
        :filter="filter"
        @change="onFilterChange"
        @search="reloadData()"
        @reset="onReset"
        @collapse-change="onFilterCollapse"
      >
        <template
          v-for="item in filterItems"
          #[`select-option-${item.prop}`]="{option}"
        >
          <slot
            :name="`select-option-${item.prop}`"
            :option="option"
          />
        </template>
      </BaseFilter>
    </template>
    <BaseTable
      v-bind="props"
      ref="tableRef"
      :filter="filter"
      :columns="columns"
      :on-selection-change="onSelectionChange"
    >
      <template #toolbarLeft>
        <slot name="toolbarLeft" />
      </template>
      <template #toolbarRight>
        <slot name="toolbarRight" />
      </template>
      <!-- 选择列 -->
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="50"
        fixed="left"
      />
      <!-- col.columnProps 通过colConfig进行透传 -->
      <el-table-column
        v-for="(col, index) in columns"
        :key="index"
        :label="col.label"
        :prop="col.prop"
        :fixed="(fixedLeft ? index === 0: col.fixed)"
        :width="col.width"
        :min-width="col.minWidth || col.label.length * 14 + 80"
        :show-overflow-tooltip="props.showOverflowTooltip
          || props.showTooltipProps.includes(col.prop)"
        :sortable="col.columnProps?.sort ? 'custom' : false"
        :align="props.align"
        v-bind="col.columnProps"
      >
        <template #default="{row}">
          <slot
            :name="col.prop"
            :row="row"
          >
            {{ (col.formatter
              ? col.formatter(row[col.prop], row)
              : defaultValueFormatter(row, col)) }}
          </slot>
        </template>
        <template
          #header
        >
          <div class="inline-flex items-center ">
            {{ col.label }}
            <template v-if="col.headerTooltip">
              <el-tooltip
                :content="col.headerTooltip.content"
                placement="top"
                v-bind="col.headerTooltip"
              >
                <el-icon
                  :size="16"
                  color="#409EFF"
                  class="ml-5 mb-2 cursor-pointer"
                >
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="columns.length && tableActionMinWidth > 0"
        label="操作"
        fixed="right"
        :min-width="tableActionMinWidth"
      >
        <template #default="{row}">
          <slot
            name="table-action-before"
            :row="row"
          />
          <!-- 默认删除按钮 -->
          <el-popconfirm
            v-if="props.showDelete"
            placement="bottom"
            trigger="click"
            title="确认删除?"
            @confirm="onDelete(row)"
          >
            <template #reference>
              <el-button
                style="margin-left: 8px"
                type="danger"
                :icon="Delete"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
          <!-- 默认编辑按钮 -->
          <el-button
            v-if="props.showEdit"
            type="primary"
            :icon="Edit"
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
          <slot
            name="table-action-after"
            :row="row"
          />

          <!-- 更多操作按钮 -->
          <el-dropdown
            v-if="props.tableMoreActions.length"
            style="margin-left:12px"
            @command="onMoreActionClick($event, row)"
          >
            <el-button
              :icon="ArrowDown"
            >
              更多
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(action, aIndex) in props.tableMoreActions"
                  :key="aIndex"
                  :command="aIndex"
                >
                  {{ action.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </BaseTable>
  </base-layout>
</template>

<script lang="ts" setup>
import { BaseLayout } from '@/components/BaseLayout'
import { BaseTable } from '@/components/BaseTable'
import { baseListProps } from './baseListProps'
import {
  computed, provide, ref,
} from 'vue'
import { baseTableProps } from '@/components/BaseTable/src/baseTableProps'
import {
  Edit, Delete, ArrowDown,
  QuestionFilled,
} from '@element-plus/icons-vue'
import { BaseFilter } from '@/components/BaseFilter'
import { useTableStore } from '@/store/table'
import { cloneDeep } from 'lodash-es'

// const TABLE_ACTION_DEFAULT_WIDTH = 210

const props = defineProps({
  ...baseTableProps,
  ...baseListProps,
})

const route = useRoute()
const getInitFilter = () => {
  const { query } = route
  const filterObj = {}
  props.filterItems.forEach((item) => {
    filterObj[item.prop] = query[item.prop] || ''
  })
  console.log('filterObj: ', filterObj)
  return filterObj
}

const filter = ref(getInitFilter())

const [deleteLoading, { toggle: toggleDeleteLoading }] = useBoolean()

const layoutRef = ref()

const tableRef = ref()
const tableStore = useTableStore()
const tableColumnPadding = computed(() => ({
  small: 8,
  default: 12,
  large: 16,
}[tableStore.tableSize]))

// eslint-disable-next-line vue/no-setup-props-destructure
const cols = []
if (props.colConfig) {
  Object.entries(props.colConfig).forEach(([prop, config]) => {
    cols.push({
      prop,
      ...config,
    })
  })
}

const defaultTableActionWidth = computed(() => {
  let minWidth = tableColumnPadding.value * 2
  let buttonCount = 0
  if (props.showEdit) {
    buttonCount++
  }
  if (props.showDelete) {
    buttonCount++
  }
  if (props.tableMoreActions.length) {
    buttonCount++
  }
  minWidth += buttonCount * 12 + buttonCount * 80
  return minWidth
})

const columns = ref(cols)
console.log('columns: ', columns)
const cacheOriginColumns = cloneDeep(cols)

const tableActionMinWidth = computed(() => {
  if (props.tableActionWidth !== void 0) {
    return props.tableActionWidth
  }
  return defaultTableActionWidth.value
})

function defaultValueFormatter(row, col) {
  return props.valuePropMap[col.prop]
    ? props.valuePropMap[col.prop][row[col.prop]] || row[col.prop]
    : row[col.prop]
}

function handleEdit(row) {
  props.onEdit && props.onEdit(row)
}

function reloadData(reset = true) {
  tableRef.value.refresh(reset)
}
function onReset() {
  tableRef.value.resetOrder()
  reloadData()
}

async function onDelete(row) {
  if (!props.deleteRequest) return
  if (deleteLoading.value) return
  const loadingMsg = showLoadingMessage('正在删除中...')
  try {
    toggleDeleteLoading(true)
    await props.deleteRequest(row)
    toggleDeleteLoading(false)
    loadingMsg.close()
    showSucessMessage('删除成功')
    reloadData()
  } catch (error) {
    console.error('[on delete]:', error)
    loadingMsg.close()
    toggleDeleteLoading(false)
  }
}

function onFilterChange() {
  reloadData()
}

function onMoreActionClick(command, row) {
  const action = props.tableMoreActions[command]
  action.onClick(row)
}

function setColumns(newColumns) {
  columns.value = cloneDeep(newColumns)
}

function resetColumns() {
  columns.value = cloneDeep(cacheOriginColumns)
  return cacheOriginColumns
}

function onFilterCollapse() {
  nextTick(() => {
    unref(layoutRef).updateListHeight()
  })
}

provide('columns', columns)
provide('setColumns', setColumns)
provide('resetColumns', resetColumns)

defineExpose({
  reloadData,
})

</script>

<style>

</style>
