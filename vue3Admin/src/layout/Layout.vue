<template>
  <div
    :class="classObj"
    class="layout-wrapper"
  >
    <div
      v-if="device === 'mobile' && opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />

    <!--left side-->
    <Sidebar
      v-if="!layoutStore.isChildAppMode"
      class="sidebar-container"
    />
    <div class="main-container">
      <Navbar v-if="!layoutStore.isChildAppMode" />
      <TagsView v-if="settings.showTagsView && !layoutStore.isChildAppMode" />
      <AppMain />
    </div>
    <!--<Settings />-->
  </div>
</template>
<!--原理vue2.0-->
<script lang="ts">
/* 可以设置默认的名字 */
export default {
  name: 'Layout',
}
</script>

<script setup lang="ts">
import {
  Sidebar, Navbar, AppMain, TagsView,
} from './components'
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useLayoutStore } from '@/store/layout'
import settings from '@/settings'
import ResizeHook from './hook/ResizeHandler'

ResizeHook()

const appStore = useAppStore()
const layoutStore = useLayoutStore()
const opened = computed(() => appStore.sidebar.opened)
const device = computed(() => appStore.device)
const withoutAnimation = computed(() => appStore.sidebar.withoutAnimation)
const classObj = computed(() => ({
  hideSidebar: !opened.value,
  openSidebar: opened.value,
  withoutAnimation: withoutAnimation.value,
  mobile: device.value === 'mobile',
  'is-child-app-layout': layoutStore.isChildAppMode,
}))
const handleClickOutside = () => {
  appStore.closeSideBar({
    withoutAnimation: false,
  })
}

</script>

<style lang="scss" scoped>
.layout-wrapper {
  position: relative;
  overflow: hidden;

  &.is-child-app-layout {
    .main-container {
      margin-left: 0 !important;
    }
    :deep(.app-main) {
      padding: 0;
    }
    :deep(.show-tag-view) {
      height: calc(100vh - 120px) !important;
    }
  }
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--side-bar-width));
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
.mobile .fixed-header {
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: var(--side-bar-width);
  position: relative;
}
.sidebar-container {
  transition: width 0.28s;
  width: var(--side-bar-width) !important;
  background-color: var(--menu-bg);
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  // overflow: hidden;
  box-shadow: 0 1px 8px rgba(0, 21, 41, 0.05);
}
.hideSidebar {
  .sidebar-container {
    width: 54px !important;
  }

  .main-container {
    margin-left: 54px;
  }
}
.mobile {
  .main-container {
    margin-left: 0;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: var(--side-bar-width) !important;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(-1 * var(--side-bar-width)), 0, 0);
    }
  }
}
.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
