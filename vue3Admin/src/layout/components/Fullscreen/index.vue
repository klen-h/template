<template>
  <el-tooltip
    :content="isFullscreen ? '还原' : '全屏'"
    placement="bottom"
  >
    <el-icon
      :size="18"
      class="cursor-pointer mr-16"
      color="#333"
      @click="toggle"
    >
      <FullscreenExitOutlined v-if="isFullscreen" />
      <FullscreenOutlined v-else />
    </el-icon>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
import { FullscreenExitOutlined, FullscreenOutlined } from '@vicons/antd'

const { isFullscreen, toggle } = useFullscreen()

defineExpose({
  isFullscreen,
})

</script>

<style>

</style>
