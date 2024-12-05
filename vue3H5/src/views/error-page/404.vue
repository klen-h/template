<template>
  <div
    class="page-container"
    w:flex="~ col"
    w:justify="center"
  >
    <div
      w:text="center"
    >
      <img
        src="~@/assets/exception/404.svg"
        alt=""
      >
    </div>
    <div
      w:text="center"
    >
      <h1
        w:text="base gray-500"
      >
        抱歉，你访问的页面不存在
      </h1>
      <el-button
        type="primary"
        @click="goHome"
      >
        回到首页
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function goHome() {
  router.push('/')
}
</script>

<style lang="scss" scoped>
  .page-container {
    width: 100%;
    border-radius: 4px;
    padding: 50px 0;
    height: 100vh;

    .text-center {
      h1 {
        color: #666;
        padding: 20px 0;
      }
    }

    img {
      width: 350px;
      margin: 0 auto;
    }
  }
</style>
