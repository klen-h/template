<template>
  <div>
    <el-config-provider
      :namespace="settings.namespace"
      :locale="zhCn"
    >
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import settings from '@/settings'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

onMounted(() => {
  // document.addEventListener('mousedown', timekeeping)
})

onUnmounted(() => {
  // document.removeEventListener('mousedown', timekeeping)
})

</script>
