<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path + item.name"
      >
        <span
          v-if="item.redirect === 'noRedirect' || index === levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta?.title }}
        </span>
        <a
          v-else
          @click.prevent="handleLink(item)"
        >{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import {
  onMounted, onBeforeMount, watch, ref, Ref,
} from 'vue'
import {
  RouteLocationMatched, useRoute, useRouter,
} from 'vue-router'
import { compile } from 'path-to-regexp'

const levelList: Ref = ref([])
const route = useRoute()
const router = useRouter()
const getBreadcrumb = () => {
  // only show routes with meta.title
  // eslint-disable-next-line max-len
  const matched = route.matched.filter((item: RouteLocationMatched) => item.meta && item.meta.title)
  // eslint-disable-next-line max-len
  levelList.value = matched.filter((item: RouteLocationMatched) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

const pathCompile = (path: string) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}
const handleLink = (item) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  if (path) {
    router.push(pathCompile(path))
  }
}
watch(
  () => route.fullPath,
  () => {
    getBreadcrumb()
  },
  {
    immediate: true,
  },
)
onMounted(() => {
  // console.log(route)
})
onBeforeMount(() => {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.#{$namespace}-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .#{$namespace}-breadcrumb__inner {
    a {
      color: var(--nav-bar-click-text);
      &:hover {
        opacity: 0.8;
      }
    }
    .no-redirect {
      color: var(--nav-bar-disabled-text);
      cursor: text;
    }
  }
}
</style>
