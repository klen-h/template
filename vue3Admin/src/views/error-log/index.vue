<template>
  <!--日志-->
  <div class="log-container">
    <div class="log-tool flex justify-end">
      <el-button
        type="success"
        :icon="Download"
        @click="exportLog"
      >
        导出日志
      </el-button>
    </div>
    <pre
      ref="preDom"
      class="log-pannel"
      v-text="logData"
    />
  </div>
</template>

<script setup lang="ts">
import { Download } from '@element-plus/icons-vue'
import { bus } from '@/utils/index'
import { onMounted, ref } from 'vue'

/* 表格查询和筛选 */
const logData = ref([])
const preDom = ref(null)
const getTableList = () => {
  logData.value = window?.$debugout?.getLog()
  nextTick(() => {
    preDom.value.scrollTop = preDom.value.scrollHeight
  })
}
const exportLog = () => {
  window?.$debugout?.downloadLog()
  // 点击下载5s后清空日志
  window.setTimeout(() => {
    window?.$debugout?.clear()
  }, 3000)
}
onMounted(() => {
  getTableList()
  bus.on('reloadErrorPage', () => {
    getTableList()
  })
})
</script>

<style scoped lang="scss">
.log {
  &-container {
    height: calc(100vh - 116px);
  }
  &-tool {
    height: 50px;
    min-height: 50px;
    background: #f3f9ff;
    border: 1px solid rgb(219, 219, 219);
    color: rgb(48, 48, 48);
    padding: 0.5rem;
    top: 40px;
  }
  &-pannel {
    font-family: 'Menlo', 'DejaVu Sans Mono', 'Liberation Mono',
    'Consolas', 'Ubuntu Mono', 'Courier New','andale mono',
    'lucida console', monospace;
    padding: 8px 12px;
    margin: 0 0 8px;
    font-size: 13px;
    word-break: break-all;
    word-wrap: break-word;
    color: #fff;
    border-radius: 2px;
    min-height: 42px;
    background-color: #111;
    line-height: 1.5em;
    overflow: auto;
    height: calc(100% - 50px);
  }
}
</style>
