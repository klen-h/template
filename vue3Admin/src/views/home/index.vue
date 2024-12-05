<template>
  <el-card style="height:100%;overflow:scroll;">
    <markdown-preview v-model="mdContent" />
  </el-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
import readme from '../../../README.md'

const mdContent = ref(
  import.meta.env.MODE === 'development'
    ? readme.replace(/\.\/public\//g, '/')
    : readme.replace(/\.\/public\//g, import.meta.env.VITE_ASSETS_PATH),
)

// import {
//   onMounted,
//   getCurrentInstance,
//   watch,
//   ref,
//   toRefs,
//   reactive,
//   computed
// } from 'vue'
// // 获取store和router
// import { useRouter } from 'vue-router'
// import { usePermissionStore } from '@/store/permission'
// // 获取实例, 尽量不使用
// let { proxy } = getCurrentInstance()
// const props = defineProps({
//   name: {
//     require: true,
//     default: 'fai',
//     type: String
//   }
// })
// const state = reactive({
//   levelList: null
// })

// const permissionStore = usePermissionStore()
// const routes = computed(() => {
//   return permissionStore.routes
// })
// watch(
//   () => props.name,
//   (oldValue, newValue) => {},
//   { immediate: true }
// )

// const router = useRouter()
// onMounted(() => {
//   console.log('页面挂载了')
// })
// let helloFunc = () => {
//   console.log('helloFunc')
// }
// // 导出给refs使用
// defineExpose({ helloFunc })
// // 导出属性到页面中使用
// let { levelList } = toRefs(state)
</script>

<style scoped lang="scss"></style>
