<template>
  <!-- eslint-disable vue/no-mutating-props  -->
  <el-card class="base-filter">
    <div
      ref="wrapRef"
      class="base-filter-view "
      :class="{
        'is-collapse':isCollapse
      }"
    >
      <el-form
        ref="formRef"
        inline
      >
        <el-form-item
          v-for="(item, index) in props.items"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <!-- 下拉框 -->
          <template v-if="item.input === 'select'">
            <el-select
              v-model="filter[item.prop]"
              placeholder=""
              v-bind="getItemInputProps(item)"
              @change="onChange"
            >
              <el-option
                v-for="(option, opIndex) in item.options"
                :key="index + '-' + opIndex"
                :label="option.label"
                :value="option.value"
              >
                <slot
                  :name="`select-option-${item.prop}`"
                  :option="option"
                >
                  {{ option.label }}
                </slot>
              </el-option>
            </el-select>
          </template>

          <!-- 加载下拉框 -->
          <template v-else-if="item.input === 'load-select'">
            <load-select
              v-model="filter[item.prop]"
              auto-fetch
              v-bind="getItemInputProps(item)"
              @clear="onClear"
              @select="onChange"
            >
              <template #default="{data}">
                <slot
                  :name="`option-${item.prop}`"
                  :data="data"
                />
              </template>
            </load-select>
          </template>

          <!-- 日期选择 -->
          <template v-else-if="item.input === 'date-picker'">
            <el-date-picker
              v-model="filter[item.prop]"
              v-bind="getItemInputProps(item)"
              @change="onChange"
            />
          </template>

          <!-- 输入框 -->
          <template v-else>
            <el-input
              v-model="props.filter[item.prop]"
              :placeholder="getItemInputProps(item).placeholder || ''"
              clearable
              v-bind="getItemInputProps(item)"
              @keyup.enter="handleSearch"
              @clear="onClear"
            />
          </template>
        </el-form-item>
      </el-form>

      <div
        class="base-filter-view__fixed flex items-center"
      >
        <el-button
          type="primary"
          @click="handleSearch"
        >
          查询
        </el-button>
        <el-button @click="onReset">
          重置
        </el-button>
        <el-button
          v-if="isOverflow || !isCollapse"
          type="primary"
          text
          @click="isCollapse = !isCollapse"
        >
          {{ isCollapse ? '展开' : '收起' }}
          <el-icon class="ml-5">
            <ArrowDown v-if="isCollapse" />
            <ArrowUp v-else />
          </el-icon>
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { baseFilterProps } from './baseFilterProps'
import { ref } from 'vue'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import useOnAppMainResize from '@/hooks/useOnAppMainResize'
import LoadSelect from '@/components/LoadSelect.vue'

const props = defineProps({
  ...baseFilterProps,
})

const WRAP_DEFAULT_HEIGHT = 50

const formRef = ref()
const wrapRef = ref()

const emits = defineEmits(['change', 'search', 'reset', 'collapse-change'])

const [isCollapse, { toggle: toggleIsCollapse }] = useBoolean()

const [isOverflow, { toggle: toggleIsOverflow }] = useBoolean()

function getItemInputProps(item) {
  return item.inputProps || {}
}

function onChange(evt) {
  emits('change', evt)
}
function onClear() {
  emits('change')
}
function onReset() {
  Object.keys(props.filter).forEach((key) => {
    // eslint-disable-next-line vue/no-mutating-props
    props.filter[key] = ''
  })
  emits('reset')
}
function handleSearch() {
  emits('search')
}

function updateIsOverfow() {
  nextTick(() => {
    const wrapperHeight = unref(wrapRef) ? unref(wrapRef).offsetHeight : 0
    const formHeight = unref(formRef) ? unref(formRef).$el.offsetHeight : 0
    toggleIsOverflow(formHeight > wrapperHeight)
    if (wrapperHeight === WRAP_DEFAULT_HEIGHT) {
      toggleIsCollapse(true)
    }
  })
}
watch(isCollapse, () => {
  emits('collapse-change')
  updateIsOverfow()
})

useOnAppMainResize(() => {
  updateIsOverfow()
})

onMounted(() => {
  updateIsOverfow()
})

</script>

<style lang="scss" scoped>
.base-filter {
   :deep(.#{$namespace}-card__body) {
    padding-bottom: 0 !important;
    height: 100%;
  }
  &-view {
    position: relative;
    height: auto;
    padding-right: 200px;
    &.is-collapse {
      height: 50px;
    }
    &__fixed {
      // top: 0;
      right: 0;
      bottom: 18px;
      position: absolute;
    }
  }

}
</style>
