<template>
  <el-tooltip
    content="列配置"
    placement="top"
  >
    <div
      class="cursor-pointer inline-block"
      style="margin-left: 12px"
    >
      <el-popover
        placement="bottom"
        trigger="click"
        width="250px"
      >
        <div class="column-setting-header flex justify-between items-center">
          <el-checkbox
            v-model="showAllColumn"
            label="列展示"
            value="列展示"
            :indeterminate="indeterminate"
          />
          <el-button
            type="primary"
            size="small"
            @click="onReset"
          >
            重置
          </el-button>
        </div>
        <div class="column-setting-main">
          <el-checkbox-group v-model="checkList">
            <Draggable
              v-model="columnList"
              animation="300"
              item-key="prop"
            >
              <template #item="{element}">
                <div class="column-setting-main-item flex justify-between items-center">
                  <div class="flex items-center">
                    <el-icon
                      :size="18"
                      class="mr-6"
                    >
                      <Rank />
                    </el-icon>
                    <el-checkbox
                      :label="element.prop"
                      :value="element.prop"
                    >
                      {{ element.label }}
                    </el-checkbox>
                  </div>
                  <div class="flex items-center">
                    <el-tooltip
                      content="固定在左侧"
                      placement="top"
                    >
                      <el-icon
                        :size="18"
                        class="cursor-pointer mr-10"
                        :color="element.fixed === 'left' ? '#409EFF' : undefined"
                        @click="fixedColumn(element, 'left')"
                      >
                        <VerticalRightOutlined />
                      </el-icon>
                    </el-tooltip>

                    <el-tooltip
                      content="固定在右侧"
                      placement="top"
                    >
                      <el-icon
                        :size="18"
                        class="cursor-pointer"
                        :color="element.fixed === 'right' ? '#409EFF' : undefined"
                        @click="fixedColumn(element, 'right')"
                      >
                        <VerticalLeftOutlined />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </div>
              </template>
            </Draggable>
          </el-checkbox-group>
        </div>

        <template #reference>
          <el-icon
            class="cursor-pointer"
            :size="18"
          >
            <Setting />
          </el-icon>
        </template>
      </el-popover>
    </div>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { Setting, Rank } from '@element-plus/icons-vue'
import Draggable from 'vuedraggable-es'
import {
  VerticalRightOutlined,
  VerticalLeftOutlined,
} from '@vicons/antd'
import { cloneDeep } from 'lodash-es'
import { storage } from '@/utils/index'

const columns:any = unref(inject('columns'))
const setColumns:any = unref(inject('setColumns'))
const resetColumns:any = unref(inject('resetColumns'))

function formatColumns(cols) {
  return cols.map((col) => ({
    ...col,
  }))
}

const route = useRoute()
// 要不要加route.path看情况,加了以后微前端和默认的path不一样,存储的值独立互不影响
const storageCheckListKey = `${route.path}_checklist`
const storageColumnListKey = `${route.path}_columnlist`
const storageCheckList = storage.get(storageCheckListKey, [])
const storageColumnList = storage.get(storageColumnListKey, [])

const columnList = storageColumnList.length
  ? ref(storageColumnList)
  : ref(formatColumns(columns))

const checkList = storageCheckList.length
  ? ref(storageCheckList)
  : ref(formatColumns(columns).map((i) => i.prop))

const showAllColumn = computed({
  get: () => columnList.value.length === checkList.value.length,
  set: (val) => {
    if (val) {
      checkList.value = columnList.value.map((i) => i.prop)
    } else {
      checkList.value = []
    }
  },
})

const indeterminate = computed(() => checkList.value.length && !showAllColumn.value)

function onReset() {
  const cacheOriginColumns = resetColumns()
  columnList.value = formatColumns(cloneDeep(cacheOriginColumns))
  checkList.value = columnList.value.map((i) => i.prop)
}

function fixedColumn(item, fixed: 'left' | 'right') {
  const index = columnList.value.findIndex((it) => it.prop === item.prop)
  const isFixed = item.fixed === fixed ? undefined : fixed
  if (index !== -1) {
    columnList.value[index].fixed = isFixed
  }
}

watch(
  () => [columnList.value, checkList.value],
  (newVal) => {
    const [columnListValue, checkListVal] = newVal
    storage.set(storageCheckListKey, checkListVal, null)
    storage.set(storageColumnListKey, columnListValue, null)
  },
  {
    deep: true,
  },
)

watchEffect(() => {
  const newColumns = unref(columnList)
    .filter((it) => checkList.value.includes(it.prop))
  setColumns(newColumns)
})

</script>

<style lang="scss" scoped>
.column-setting-header {
  border-bottom: 1px solid var(--el-border-color);
  padding-bottom: 5px;
}
.column-setting-main {
  &-item {
    padding: 5px;
  }
}
</style>
