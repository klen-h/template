<template>
  <div
    class="hamburger-wrapper"
    @click="toggleClick"
  >
    <el-icon
      :size="18"
      color="#333"
    >
      <MenuFoldOutlined v-if="isActive" />
      <MenuUnfoldOutlined v-else />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'

const appStore = useAppStore()
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
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  &-wrapper {
    margin: 0 12px;
    cursor: pointer;
    color: var(--nav-bar-click-text);
    display: inline-flex;
    align-items: center;
  }
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
