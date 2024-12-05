<template>
  <div
    class="demo"
    bg-white
    dark:bg-black
    font-pingf-medium
  >
    <button @click="toggleDark">
      切换夜间模式
    </button>
    <h1
      text-amber
      dark:text-blue
      text-center
    >
      h1
      <span font-same-width>12345657289890333</span>
    </h1>
    <h2 lt-md:hidden>
      h2
    </h2>

    <el-image
      src=""
      lazy
      h-50px
    >
      <template #placeholder>
        <div
          bg-loading-bg
          text-loading-text
          text-20px
        >
          Loading
        </div>
      </template>
    </el-image>
  </div>
</template>
<script setup lang="ts">
const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
}
</script>
<style lang="scss" scoped>

</style>
