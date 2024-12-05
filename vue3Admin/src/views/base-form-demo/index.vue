<template>
  <BaseForm
    ref="baseFormRef"
    :prop-map="propMap"
    :config="config"
    :model="form"
    :rules="formRules"
    title="表单"
    @validated="submit"
    @reset="onReset"
  />
</template>

<script lang="ts" setup>
import {
  BaseForm, BaseFormItemConfig, PropItem,
} from '@/components/BaseForm'
import { getOptionsFromMap } from '@/utils'
import {
  CURRENCY_TYPE, MARKET_TYPE, COMPANY_TYPE_TEXT, STOCK_PROP_MAP, LIST_STATUS_MAP,
} from './test-const'

const form = reactive({})
const baseFormRef = ref()
const propMap = STOCK_PROP_MAP as PropItem[]
const config:BaseFormItemConfig = {
  company_type: {
    input: 'select',
    options: getOptionsFromMap(COMPANY_TYPE_TEXT, {
      all: false,
      number: true,
    }),
  },
  list_date: {
    input: 'date-picker',
    inputProps: {
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
  },
  delist_date: {
    input: 'date-picker',
    inputProps: {
      type: 'date',
      valueFormat: 'yyyy-MM-dd',

    },
  },
  weight: {
    input: 'input-number',
  },
  currency: {
    input: 'select',
    options: getOptionsFromMap(CURRENCY_TYPE, {
      all: false,
    }),
  },
  market: {
    input: 'select',
    options: getOptionsFromMap(MARKET_TYPE, {
      all: false,
    }),
  },
  list_status: {
    input: 'select',
    options: getOptionsFromMap(LIST_STATUS_MAP, {
      all: false,
    }),
  },

}

const formRules = {
  symbol: [
    {
      required: true, trigger: 'blur', message: '请输入',
    },
  ],
  code: [
    {
      required: true, trigger: 'blur', message: '请输入',
    },
  ],
  company_type: [
    {
      required: true, trigger: 'change', message: '请选择',
    },
  ],
  company_id: [
    {
      required: true, trigger: 'change', message: '请选择',
    },
  ],
}

function onReset() {
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })
  setTimeout(() => {
    unref(unref(baseFormRef).formRef).clearValidate()
  }, 0)
}

const submitApi = () => new Promise<void>((resolve) => {
  setTimeout(() => {
    resolve()
  }, 3000)
})
const submit = useSubmitLock(async () => {
  const loadingMsg = showLoadingMessage()
  await submitApi()
  loadingMsg.close()
  showSucessMessage()
})
</script>

<style>

</style>
