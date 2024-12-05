<template>
  <div>getter</div>
  <el-button @click="getterFunc">
    获取getter:{{ getterValue }}
  </el-button>
  <div class="mt-2">
    action
  </div>
  <el-button @click="toggleSideBarAction">
    toggleSideBar
  </el-button>
  <div>是否开启：{{ opened }}</div>
</template>

<script lang="ts">
export default {
  name: 'VuexUse',
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

// 等同于mapState
const opened = computed(() => appStore.sidebar.opened)

/* getter */
const getterValue = ref(null)
const getterFunc = () => {
  getterValue.value = appStore.device
}

const toggleSideBarAction = () => {
  appStore.toggleSideBar()
}
</script>

<style scoped lang="scss"></style>
