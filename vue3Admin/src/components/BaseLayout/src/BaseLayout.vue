<template>
  <div
    ref="layoutRef"
    class="base-layout"
  >
    <div
      v-if="slots.action"
      ref="actionRef"
      class="base-layout__action"
      :style="{
        'margin-bottom': MARGIN + 'px'
      }"
    >
      <slot name="action" />
    </div>
    <div
      ref="listRef"
      class="base-layout__list"
    >
      <slot ref="defaultSlotRef" />
    </div>
    <div
      ref="footerRef"
      class="base-layout__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue'

import useOnAppMainResize from '@/hooks/useOnAppMainResize'
import setting from '@/settings'

const MARGIN = 10

const tagViewHeight = setting.showTagsView ? 44 : 0

const slots = useSlots()

const layoutRef = ref()
const actionRef = ref()
const listRef = ref()
const footerRef = ref()
const defaultSlotRef = ref()

function updateListHeight() {
  const actionHeight = actionRef.value ? (actionRef.value.offsetHeight + MARGIN) : -MARGIN
  const footerHeight = actionRef.value?.footerRef || 0
  if (listRef.value) {
    listRef.value.style = `height: calc(100% - ${actionHeight + footerHeight + tagViewHeight}px)`
  }
}

useOnAppMainResize(() => {
  updateListHeight()
})

defineExpose({
  updateListHeight,
})

</script>

<style lang="scss" scoped>
.base-layout {
  height: calc(100vh - 80px);
  &__action {
    position: relative;
  }
  &__footer {
    position: relative;
  }
  &__list {
    transition: height .3s;
    & > * {
      height: 100%;
    }
  }
}
</style>
