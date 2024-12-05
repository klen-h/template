<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <div class="tabs-view-main">
      <div
        ref="navWrap"
        class="tabs-card"
        :class="{ 'tabs-card-scrollable': scrollable }"
      >
        <span
          class="tabs-card-prev"
          :class="{ 'tabs-card-prev-hide': !scrollable }"
          @click="scrollPrev"
        >
          <el-icon
            size="16"
            color="#515a6e"
          >
            <left-outlined />
          </el-icon>
        </span>
        <span
          class="tabs-card-next"
          :class="{ 'tabs-card-next-hide': !scrollable }"
          @click="scrollNext"
        >
          <el-icon
            size="16"
            color="#515a6e"
          >
            <right-outlined />
          </el-icon>
        </span>
        <div
          ref="navScroll"
          class="tabs-card-scroll"
        >
          <div
            v-if="visitedViews"
            class="tags-view-wrapper"
          >
            <router-link
              v-for="tag in visitedViews"
              ref="refTag"
              :key="tag.path"
              :class="isActive(tag) ? 'active' : ''"
              :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
              class="tags-view-item"
              @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
              @contextmenu.prevent="openMenu(tag, $event)"
            >
              {{ tag.title }}
              <Close
                v-if="!isAffix(tag)"
                class="icon-close"
                @click.prevent.stop="closeSelectedTag(tag)"
              />
            </router-link>
          </div>
        </div>
      </div>

      <div class="tabs-close">
        <el-dropdown @command="handleTag">
          <el-icon>
            <arrow-down />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="refresh">
                <el-icon>
                  <ReloadOutlined />
                </el-icon>
                刷新当前
              </el-dropdown-item>
              <el-dropdown-item
                v-if="!isAffix(selectedTag)"
                :disabled="isDisabled"
                command="close"
              >
                <el-icon>
                  <CloseOutlined />
                </el-icon>
                关闭当前
              </el-dropdown-item>
              <el-dropdown-item
                :disabled="isDisabled"
                command="closeOthers"
              >
                <el-icon>
                  <column-width-outlined />
                </el-icon>
                关闭其他
              </el-dropdown-item>
              <el-dropdown-item
                :disabled="isDisabled"
                command="closeAll"
              >
                <el-icon>
                  <minus-outlined />
                </el-icon>
                关闭全部
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <ul
        v-show="visible"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
      >
        <li @click="refreshSelectedTag(selectedTag)">
          <el-icon>
            <reload-outlined />
          </el-icon>
          刷新当前
        </li>
        <li
          v-if="!isAffix(selectedTag)"
          :class="{'item--disabled' : isDisabled}"
          @click="closeSelectedTag(selectedTag)"
        >
          <el-icon>
            <close-outlined />
          </el-icon>
          关闭当前
        </li>
        <li
          :class="{'item--disabled' : isDisabled}"
          @click="closeOthersTags"
        >
          <el-icon>
            <column-width-outlined />
          </el-icon>
          关闭其他
        </li>
        <li
          :class="{'item--disabled' : isDisabled}"
          @click="closeAllTags(selectedTag)"
        >
          <el-icon>
            <minus-outlined />
          </el-icon>
          关闭全部
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// import ScrollPane from './ScrollPane'
import { Close, ArrowDown } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import elementResizeDetectorMaker from 'element-resize-detector'
import {
  ReloadOutlined,
  CloseOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
  LeftOutlined,
  RightOutlined,
} from '@vicons/antd'
// 获取store和router

import { RouterTy, RouteItemTy } from '@/types/router'
import { ObjTy } from '@/types/common'
import { useAppStore } from '@/store/app'
import { useTagsViewStore } from '@/store/tagsView'
import { usePermissionStore } from '@/store/permission'

const $route = useRoute()
const $router = useRouter()
const tagsViewStore = useTagsViewStore()
const appStore = useAppStore()

const state: ObjTy = reactive({
  visible: false,
  top: 0,
  left: 0,
  scrollable: false,
  selectedTag: $route,
  affixTags: [],
})

const visitedViews = computed(() => tagsViewStore.visitedViews)
const permissionStore = usePermissionStore()
const routes = computed(() => permissionStore.routes)
const isDisabled = computed(() => unref(visitedViews).length <= 1)

const navScroll: any = ref(null)
const navWrap: any = ref(null)

const isActive = (route: RouteItemTy) => route.path === $route.path
const isAffix = (tag: RouteItemTy) => tag.meta && tag.meta.affix

/**
 * @param value 要滚动到的位置
 * @param amplitude 每次滚动的长度
 */
function scrollTo(value: number, amplitude: number) {
  const currentScroll = navScroll.value.scrollLeft
  const scrollWidth = (amplitude > 0 && currentScroll + amplitude >= value)
    || (amplitude < 0 && currentScroll + amplitude <= value)
    ? value
    : currentScroll + amplitude
  navScroll.value && navScroll.value.scrollTo(scrollWidth, 0)
  if (scrollWidth === value) return
  window.requestAnimationFrame(() => scrollTo(value, amplitude))
}

/**
 * @param autoScroll 是否开启自动滚动功能
 */
async function updateNavScroll(autoScroll?: boolean) {
  await nextTick()
  if (!navScroll.value) return
  const containerWidth = navScroll.value.offsetWidth
  const navWidth = navScroll.value.scrollWidth
  if (containerWidth < navWidth) {
    state.scrollable = true
    if (autoScroll) {
      const tagList = navScroll.value.querySelectorAll('.tabs-card-scroll-item') || [];
      [...tagList].forEach((tag: HTMLElement) => {
        // fix SyntaxError
        if (tag.id === `tag${state.activeKey.split('/').join('/')}`) {
          tag.scrollIntoView && tag.scrollIntoView()
        }
      })
    }
  } else {
    state.scrollable = false
  }
}

function handleResize() {
  updateNavScroll(true)
}

function onElementResize() {
  const observer = elementResizeDetectorMaker()
  observer.listenTo(navWrap.value, handleResize)
}

function scrollPrev() {
  const containerWidth = navScroll.value.offsetWidth
  const currentScroll = navScroll.value.scrollLeft

  if (!currentScroll) return
  const scrollLeft = currentScroll > containerWidth ? currentScroll - containerWidth : 0
  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
}

function scrollNext() {
  const containerWidth = navScroll.value.offsetWidth
  const navWidth = navScroll.value.scrollWidth
  const currentScroll = navScroll.value.scrollLeft

  if (navWidth - currentScroll <= containerWidth) return
  const scrollLeft = navWidth - currentScroll > containerWidth * 2
    ? currentScroll + containerWidth
    : navWidth - containerWidth
  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
}

const filterAffixTags = (routes: RouterTy, basePath = '/') => {
  let tags: Array<RouteItemTy> = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = `${basePath}${route.path}`
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: {
          ...route.meta,
        },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}
const initTags = () => {
  // eslint-disable-next-line no-multi-assign
  const affixTags = (state.affixTags = filterAffixTags(routes.value))
  // eslint-disable-next-line no-restricted-syntax
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}

const addTags = () => {
  const { name } = $route
  if (name) {
    tagsViewStore.addView($route)
  }
  return false
}
const refreshSelectedTag = (view: RouteItemTy) => {
  const { fullPath } = view
  nextTick(() => {
    $router.replace({
      path: `/redirect${fullPath}`,
    })
  })
}

const toLastView = (visitedViews: RouterTy, view: RouteItemTy) => {
  const latestView: ObjTy = visitedViews.slice(-1)[0]
  if (latestView) {
    $router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    // eslint-disable-next-line no-lonely-if
    if (view.name === 'Dashboard') {
      // to reload home page
      $router.replace({
        path: `/redirect${view.fullPath}`,
      })
    } else {
      $router.push('/')
    }
  }
}
const closeSelectedTag = (view: RouteItemTy | any) => {
  if (isDisabled.value) return
  tagsViewStore.delView(view).then(({ visitedViews }: any) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
    // remove keep-alive by the closeTabRmCache
    if (view.meta?.closeTabRmCache) {
      const routerLevel = view.matched.length
      if (routerLevel === 2) {
        appStore.M_DEL_CACHED_VIEW(view.name)
      }
      if (routerLevel === 3) {
        appStore.M_DEL_CACHED_VIEW_DEEP(view.name)
      }
    }
  })
}
const closeOthersTags = () => {
  if (isDisabled.value) return
  $router.push(state.selectedTag)
  tagsViewStore.delOthersViews(state.selectedTag)
}
const closeAllTags = (view: RouteItemTy) => {
  if (isDisabled.value) return
  tagsViewStore.delAllViews().then(({ visitedViews }: any) => {
    if (state.affixTags.some((tag: RouteItemTy) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}

const { proxy }: any = getCurrentInstance()
const openMenu = (tag: RouteItemTy, event: any) => {
  const menuMinWidth = 105
  const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
  const { offsetWidth } = proxy.$el // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = event.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = left
  }
  state.top = event.clientY
  state.visible = true
  state.selectedTag = tag
}
const closeMenu = () => {
  state.visible = false
}
// const handleScroll = () => {
//   closeMenu()
// }

// export to page use
const { visible, top, left, selectedTag, scrollable } = toRefs(state)

const handleTag = (command: string | number) => {
  switch (command) {
    case 'refresh':
      refreshSelectedTag(state.selectedTag)
      break
    case 'close':
      closeSelectedTag(state.selectedTag)
      break
    case 'closeOthers':
      closeOthersTags()
      break
    case 'closeAll':
      closeAllTags(state.selectedTag)
      break

    default:
      break
  }
}

watch(
  () => $route.path,
  () => {
    if (!$route.path.includes('redirect')) addTags()
    // tag remove has issue
    // moveToCurrentTag()
    updateNavScroll(true)
  },
)
watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  },
)

onMounted(() => {
  initTags()
  addTags()
  onElementResize()
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: $tagViewHeight;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  // background: #fff;
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tabs-view {
    &-main {
      display: flex;
      max-width: 100%;
      min-width: 100%;
    .tabs-card {
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      position: relative;

      .tabs-card-prev,
      .tabs-card-next {
        width: 32px;
        text-align: center;
        position: absolute;
        line-height: 32px;
        cursor: pointer;

        .n-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
        }
      }

      .tabs-card-prev {
        left: 0;
      }

      .tabs-card-next {
        right: 0;
      }

      .tabs-card-next-hide,
      .tabs-card-prev-hide {
        display: none;
      }

      &-scroll {
        white-space: nowrap;
        overflow: hidden;
      }
      &-scrollable {
        padding: 0 32px;
        overflow: hidden;
      }
    }
    }

  }
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 32px;
      line-height: 20px;
      margin-right: 10px;
      color: #495060;
      background: #fff;
      padding: 6px 16px 4px;
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        // background-color: #42b983;
        color: #2d8cf0;
        // border-color: #42b983;
        // &::before {
        //   content: '';
        //   background: #fff;
        //   display: inline-block;
        //   width: 8px;
        //   height: 8px;
        //   border-radius: 50%;
        //   position: relative;
        //   margin-right: 2px;
        // }
      }
    }
  }
  .tabs-close {
    cursor: pointer;
    min-width: 32px;
    width: 32px;
    height: 32px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      margin-left: 0;
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }

      &.item--disabled {
        cursor: not-allowed;
        color: var(--el-text-color-disabled);
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    border-radius: 3px;
    .icon-close {
      border-radius: 6px;
      width: 12px;
      height: 12px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      vertical-align: -2px;
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
