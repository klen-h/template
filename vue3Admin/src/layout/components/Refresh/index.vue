<template>
  <div
    class="refresh-wrapper"
    @click="toggleClick"
  >
    <el-icon
      :size="18"
      color="#333"
    >
      <refresh />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { Refresh } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
const toggleClick = () => {
  const { fullPath } = $route
  nextTick(() => {
    $router.replace({
      path: `/redirect${fullPath}`,
    })
  })
}
</script>

<style scoped lang="scss">
.refresh {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  &-wrapper {
    cursor: pointer;
    color: var(--nav-bar-click-text);
    display: inline-flex;
    align-items: center;
  }
}

</style>
