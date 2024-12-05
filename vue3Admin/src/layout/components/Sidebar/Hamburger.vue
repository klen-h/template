<template>
  <div
    class="hamburger-side-wrapper"
    @click="toggleClick"
  >
    <el-icon
      :size="18"
      color="#333"
    >
      <LeftOutlined v-if="opened" />
      <RightOutlined v-else />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { LeftOutlined, RightOutlined } from '@vicons/antd'

const appStore = useAppStore()
const opened = computed(() => appStore.sidebar.opened)

defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})
const toggleClick = () => {
  appStore.toggleSideBar()
}
</script>

<style scoped lang="scss">
.hamburger {
  &-side-wrapper {
    cursor: pointer;
    height: 32px;
    width: 32px;
    position: absolute;
    top: calc(50% - 36px);
    right: -16px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--nav-bar-click-text);
    z-index: 99;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  }
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
