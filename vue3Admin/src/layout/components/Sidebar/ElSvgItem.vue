<template>
  <el-icon
    class="el-svg-icon"
    v-bind="$attrs"
  >
    <component :is="ElSvg[elSvgName]" />
  </el-icon>
</template>

<script setup lang="ts">
import * as ElSvg from '@element-plus/icons-vue'

const props = defineProps({
  elSvgName: {
    require: true,
    default: 'Fold',
    type: String,
  },
})
// eslint-disable-next-line vue/no-setup-props-destructure
const { elSvgName } = props
</script>

<style scoped lang="scss">
.el-svg-icon {
  width: 1em;
  height: 1em;
  margin-left: -2px;
  font-size: 20px !important;
  text-align: left !important;
}
</style>
<style lang="scss">
.nav-icon {
  .el-svg-icon {
    margin-right: 0;
    width: auto;
  }
}
.#{$namespace}-menu--collapse {
  .nav-icon {
    .el-svg-icon {
      width: auto !important;
    }
  }
}
</style>
