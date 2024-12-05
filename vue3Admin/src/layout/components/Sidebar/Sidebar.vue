<template>
  <div id="Sidebar">
    <div class="sidebar-warp">
      <!--logo-->
      <Logo
        v-if="settings.sidebarLogo"
        :collapse="!isCollapse"
      />
      <!--router nav-->
      <el-scrollbar wrap-class="scrollbar-wrapper reset-menu-style">
        <el-menu
          :default-active="activeMenu"
          :collapse="!isCollapse"
          :unique-opened="false"
          :collapse-transition="false"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :active-text-color="variables.menuActiveText"
          mode="vertical"
        >
          <sidebar-item
            v-for="item in routes"
            :key="item.path"
            :item="item"
            :base-path="item.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
    <Hamburger v-if="!isMobile" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
// 导入配置文件
import settings from '@/settings'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { useThemeStore } from '@/store/theme'
import { usePermissionStore } from '@/store/permission'
import Hamburger from './Hamburger.vue'

const appStore = useAppStore()
const isCollapse = computed(() => appStore.sidebar.opened)
const permissionStore = usePermissionStore()
const routes = computed(() => permissionStore.routes)

const themeStore = useThemeStore()
const variables = computed(() => themeStore.variables)
const isMobile = computed(() => appStore.$state.device === 'mobile')

const route = useRoute()
const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<style lang="scss">
.reset-menu-style {
  padding-bottom: 50px;
  .#{$namespace}-menu {
    border-right: none;
  }
}

.#{$namespace}-menu-vertical {
  width: var(--side-bar-width);
}
</style>
