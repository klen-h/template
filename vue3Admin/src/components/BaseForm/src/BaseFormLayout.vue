<template>
  <div class="base-form-layout">
    <div class="base-form-layout__title">
      <slot name="title">
        {{ props.title }}
      </slot>
    </div>
    <div class="base-form-layout__content">
      <slot />
    </div>
    <div
      v-if="slots.action"
      class="base-form-layout__action"
      :class="{
        'sidebar-hide': !sideOpened,
        'is-mobile':isMobile
      }"
    >
      <slot name="action" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { baseFormLayoutProps } from './props/baseFormLayoutProps'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const slots = useSlots()

const sideOpened = computed(() => appStore.$state.sidebar.opened)
const isMobile = computed(() => appStore.$state.device === 'mobile')

const props = defineProps({
  ...baseFormLayoutProps,
})

</script>

<style lang="scss" scoped>
.base-form-layout {
  padding-bottom: 76px;
  &__title,
  &__content {
    background-color: #fff;
    padding: 16px;
  }
  &__title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  &__action {
    z-index: 1;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    bottom: 0;
    right: 0;
    left: 210px;
    background: #fff;
    box-shadow: 0 -2px 6px 0 rgba(132, 132, 132, .16);
    transition: left .3s;
    &.sidebar-hide {
      left: 54px;
    }
    &.is-mobile {
      left: 0
    }
  }
}
</style>
