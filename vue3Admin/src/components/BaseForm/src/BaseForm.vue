<template>
  <BaseFormLayout
    :title="props.title"
  >
    <el-row justify="center">
      <el-col
        :lg="isFullWidth?24:16"
        :md="isFullWidth?24:16"
        :sm="isFullWidth?24:18"
        :xs="isFullWidth?24:24"
      >
        <el-form
          ref="formRef"
          :model="model"
          :label-width="labelWidth + 'px'"
          :label-postion="labelPostion"
          :rules="rules"
        >
          <el-form-item
            v-for="(item, index) in items"
            :key="item.prop + `-${index}`"
            :label="item.label"
            :prop="item.prop"
          >
            <slot :name="item.prop">
              <!-- 下拉框 -->
              <template v-if="item.input === 'select'">
                <el-select
                  v-if="item.options"
                  v-model="model[item.prop]"
                  :placeholder="getItemInputProps(item).placeholder || '请选择'"
                  :disabled="props.edit && getItemInputProps(item).disabled"
                  v-bind="item.inputProps"
                >
                  <el-option
                    v-for="(option, opIndex) in item.options"
                    :key="option.value + `-${opIndex}`"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
              <!-- 加载下拉框 -->
              <template v-else-if="item.input === 'load-select'">
                <load-select
                  v-model="model[item.prop]"
                  v-bind="item.inputProps"
                >
                  <template #default="{data}">
                    <slot
                      :name="`option-${item.prop}`"
                      :data="data"
                    />
                  </template>
                </load-select>
              </template>
              <!-- 日期, 时间选择器 -->
              <template v-else-if="item.input === 'date-picker'">
                <el-date-picker
                  v-model="model[item.prop]"
                  :placeholder="getItemInputProps(item).placeholder || '请选择'"
                  :disabled="props.edit && getItemInputProps(item).disabled"
                />
              </template>
              <!-- 数字输入框 -->
              <template v-else-if="item.input === 'input-number'">
                <el-input-number
                  v-model="model[item.prop]"
                  :placeholder="getItemInputProps(item).placeholder || '请输入'"
                  :disabled="edit && item.disabled"
                  :step="getItemInputProps(item).step || 1"
                />
              </template>
              <!-- 输入框 -->
              <template v-else>
                <el-input
                  v-model="model[item.prop]"
                  :disabled="props.edit && getItemInputProps(item).disabled"
                  v-bind="item.inputProps"
                />
                <div
                  v-if="item.tips"
                  class="tips"
                >
                  {{ item.tips }}
                </div>
              </template>
            </slot>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <template
      v-if="showFormFooter"
      #action
    >
      <slot name="action">
        <el-button
          type="primary"
          @click="validate"
        >
          提交
        </el-button>
        <el-button @click="emits('reset')">
          重置
        </el-button>
      </slot>
    </template>
  </BaseFormLayout>
</template>

<script lang="ts" setup>
import { getColsFromPropMap } from '@/utils'
import BaseFormLayout from './BaseFormLayout.vue'
import { baseFormLayoutProps } from './props/baseFormLayoutProps'
import { baseFormProps } from './props/baseFormProps'
import LoadSelect from '@/components/LoadSelect.vue'

const props = defineProps({
  ...baseFormLayoutProps,
  ...baseFormProps,
})

const emits = defineEmits(['submit', 'reset', 'validated'])

// eslint-disable-next-line vue/no-setup-props-destructure
const items = getColsFromPropMap(props.propMap)
if (props.config) {
  // eslint-disable-next-line no-use-before-define
  insertFormInputConfig(items, props.config)
}

const formRef = ref()

/** 往表单元素数组插入输入框类型及选项配置 */
function insertFormInputConfig(formItems, inputConfig) {
  formItems.forEach((item, index) => {
    const config = inputConfig[item.prop]
    if (config) {
      // eslint-disable-next-line no-param-reassign
      formItems[index] = {
        ...item,
        ...config,
      }
    }
  })
}

function getItemInputProps(item) {
  return item.inputProps || {}
}

function validate() {
  emits('submit')
  return new Promise((resolve) => {
    unref(formRef).validate((valid) => {
      if (valid) {
        emits('validated')
        resolve(true)
      } else {
        showWarnMessage('请检查填写内容')
      }
    })
  })
}

defineExpose({
  validate,
  formRef,
})

</script>

<style lang="scss" scoped>
.tips {
  line-height: 20px;
  font-size: 12px;
  color: #bbb;
}
</style>
