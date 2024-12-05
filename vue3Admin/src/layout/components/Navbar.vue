<template>
  <div class="navbar row-between-center">
    <div class="row-start-center">
      <hamburger
        v-if="settings.showHamburger"
        :is-active="opened"
        class="hamburger-container"
      />

      <Refresh />

      <breadcrumb class="breadcrumb-container" />
    </div>
    <div
      v-if="settings.showDropDown"
      class="right-menu"
    >
      <Search />
      <!-- <Lock /> -->
      <Fullscreen />
      <el-dropdown
        trigger="click"
        size="medium"
      >
        <div class="avatar-wrapper">
          <img
            :src="avatar"
            class="user-avatar"
          >
          <span class="nick">{{ userName }}</span>
          <CaretBottom style="width: 1em; height: 1em" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item
              v-if="settings.filterNav"
              divided
              @click="goToMenuSetting"
            >
              菜单权限设置
            </el-dropdown-item>
            <el-dropdown-item
              divided
              @click="loginOut"
            >
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CaretBottom } from '@element-plus/icons-vue'
import Breadcrumb from './Breadcrumb/index.vue'
import Hamburger from './Hamburger/index.vue'
import Refresh from './Refresh/index.vue'
import Search from './Search/index.vue'
// import Lock from './Lock/index.vue'
import Fullscreen from './Fullscreen/index.vue'
import { computed } from 'vue'
import settings from '@/settings'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

const appStore = useAppStore()
const userStore = useUserStore()

const opened = computed(() => appStore.sidebar.opened)
const avatar = computed(() => userStore.userAvatar)
const userName = computed(() => userStore.userName)

/*
 * 退出登录
 * */
const loginOut = () => {
  userStore.logout()
}
const goToMenuSetting = () => {
  window.location.href = ''
}
</script>

<style lang="scss" scoped>
.navbar {
  height: var(--nav-bar-height);
  overflow: hidden;
  position: relative;
  background: var(--nav-bar-bg);
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

//logo
.avatar-wrapper {
  // margin-top: 5px;
  position: relative;
  cursor: pointer;
  color: var(--nav-bar-click-text);
  display: flex;
  align-items: center;

  .user-avatar {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }
  .nick {
    margin: 0 5px;
  }

  .#{$namespace}-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
}
</style>
