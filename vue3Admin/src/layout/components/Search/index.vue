<template>
  <div class="search-wrapper">
    <el-tooltip
      content="搜索"
      placement="bottom"
    >
      <el-icon
        :size="18"
        color="#333"
      >
        <Search @click="() => toggleShowSearchModal(true)" />
      </el-icon>
    </el-tooltip>
  </div>

  <el-dialog
    v-model="showSearchModal"
    class="search-dialog-warp"
    top="5vh"
    :show-close="false"
  >
    <el-space
      style="width: 100%"
      direction="vertical"
      wrap
      fill
    >
      <el-input
        v-model="searchKey"
        placeholder="请输入关键字搜索菜单"
      />
      <el-empty
        v-if="filterSearch.length === 0"
        description="暂无搜索结果"
      />
      <div
        v-else
        class="search-list"
      >
        <div
          v-for="item in filterSearch"
          :key="item.value"
          class="search-item"
          @click="dropdownSelect(item.value);toggleShowSearchModal(false);"
        >
          {{ item.label }}
        </div>
      </div>
    </el-space>
  </el-dialog>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const [showSearchModal, { toggle: toggleShowSearchModal }] = useBoolean()
const searchKey = ref('')
const allRoutes = router.getRoutes().filter((item) => !/\/.*\/.*/.test(item.path))
type searchRouteTy = {
  label: string
  value: string,
  title: string
}
const searchRoutes: searchRouteTy[] = []
const isNoNeedInSearch = (item) => !['Redirect', '404', '401', '500', 'PathMatch'].includes(item.name)
const childRouteDeal = (item, title) => {
  item.children.forEach((child) => {
    if (child.children) {
      childRouteDeal(child, `${title}-${child.meta && child.meta.title}`)
    } else if (isNoNeedInSearch(child)) {
      searchRoutes.push({
        label: `${title}-${child.meta && child.meta.title}`, value: child.name, title: child.meta && child.meta.title,
      })
    }
  })
}
[...allRoutes].forEach((item) => {
  const title = ((item.meta && item.meta.title) || item.name || item.path) as string
  if (item.children) {
    childRouteDeal(item, title)
  } else if (isNoNeedInSearch(item)) {
    searchRoutes.push({
      label: title,
      value: item.name as string,
      title,
    })
  }
})

const filterSearch = computed(() => searchRoutes.filter((item) => {
  console.log(searchKey.value.trim(), item)
  if (searchKey.value.trim()) return item.title.includes(searchKey.value.trim())
  return false
}))

const dropdownSelect = (key) => {
  router.push({
    name: key,
  })
}

</script>

<style scoped lang="scss">
.search {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  &-wrapper {
    margin: 0 12px;
    cursor: pointer;
    color: var(--nav-bar-click-text);
    display: inline-flex;
    align-items: center;
  }

  &-list {
    border: 1px solid rgb(239, 239, 245);

  }

  &-item {
    padding: 12px 20px;
    border-bottom: 1px solid rgb(239, 239, 245);
    &:hover {
      background-color: var(--el-color-primary);
      color: #fff;
    }
  }
}

</style>

<style lang="scss">
.search-dialog-warp {
    .#{$namespace}-dialog__header {
      height: 0;
      padding: 0 !important;
    }
}
</style>
