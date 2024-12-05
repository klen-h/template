<template>
  <BaseList
    border
    :fetcher="getTopList"
    :res-adapter="resAdapter"
    :page-adapter="pageAdapter"
    :col-config="COL_CONFIG"
    :show-tooltip-props="['id']"
    :filter-items="filterItems"
    :value-prop-map="valuePropMap"
    :table-more-actions="moreActions"
    show-delete
    :delete-request="deleteReq"
    :on-edit="onEdit"
    :before-request="beforeRequest"
  >
    <template #toolbarLeft>
      <el-button
        :icon="Plus"
        type="primary"
        @click="onAdd"
      >
        新建
      </el-button>
    </template>
    <!-- table cloumn slot -->
    <template #id="{row}">
      {{ row.id }}
    </template>
  </BaseList>
</template>

<script lang="ts" setup>
import { BaseList } from '@/components/BaseList'
import { getTopList, getGender } from '@/api/test-api'
import { Plus } from '@element-plus/icons-vue'
import {
  COL_CONFIG,
  ENABLED_TOP_STATUS_MAP,
  TOP_POS,
} from './test-const'
import { getOptionsFromMap } from '@/utils'
import { TableMoreActionItem } from '@/components/BaseList/src/baseListProps'
import { FilterItem } from '@/components/BaseFilter'

const searchStock = async () => {
  const { data } = await getGender()
  return {
    data: {
      list: data.data.list,
      total: data.data.list.length,
    },
  }
}

const filterItems: FilterItem[] = [
  {
    label: '性别',
    prop: 'id',
    input: 'load-select',
    inputProps: {
      fetcher: searchStock,
      valueKey: 'id',
      labelKey: 'name',
    },
  },

  {
    label: '位置',
    prop: 'pos',
    input: 'select',
    options: getOptionsFromMap(TOP_POS).filter((item) => item.label !== '未知'),
  },
  {
    label: '状态',
    prop: 'status',
    input: 'select',
    options: getOptionsFromMap(ENABLED_TOP_STATUS_MAP).filter((item) => item.label !== '未知'),
  },
  {
    label: '输入',
    prop: 'test',
    input: 'input',
  },
  {
    label: '日期',
    prop: 'test_date',
    input: 'date-picker',
    inputProps: {
      type: 'date',
    },
  },

]

const moreActions:TableMoreActionItem[] = [
  {
    name: '操作1',
    onClick: (row) => {
      console.log('row -->', row)
      showSucessMessage('点击了操作1')
    },
  },
  {
    name: '操作2',
    onClick: () => {
      showSucessMessage('点击了操作2')
    },
  },
]

function beforeRequest(params, { order, orderProp }) {
  const result = {
    ...params,
  }
  const orderType = {
    ascending: 'ASC',
    descending: 'DESC',
  }[order]
  if (orderType) {
    result.order = JSON.stringify([orderProp, orderType])
  } else {
    result.order = ''
  }
  console.log('beforeRequest params', result)
  return result
}

const valuePropMap = {
  status: ENABLED_TOP_STATUS_MAP,
}

function pageAdapter({ page, pageSize }) {
  return {
    page,
    page_size: pageSize,
  }
}

function resAdapter({ data }) {
  return {
    list: data.list,
    total: data.list.length,
  }
}

function deleteReq() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {},
      })
    }, 600)
  })
}

function onEdit(row) {
  showSucessMessage('点击了编辑')
  console.log('点击了 ->', row)
}

function onAdd() {
  showSucessMessage('点击了新建')
}

</script>

<style>

</style>
