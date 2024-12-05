<template>
  <div
    ref="mdPreview"
    v-loading="loading"
  />
</template>
<script setup lang="ts">
import { loadScript } from '@/utils/script'

const mdPreview = ref(null)
const editor = ref(null)
const [loading, { toggle: toggleLoading }] = useBoolean()

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

function initEditor() {
  editor.value = new window.toastui.Editor({
    el: mdPreview.value,
    initialValue: props.modelValue,
    hideModeSwitch: true,
  })
  toggleLoading(false)
}

onMounted(() => {
  if (window.toastui) {
    initEditor()
  } else {
    toggleLoading(true)
    Promise.all([
      loadScript('https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.js'),
    ]).then(() => {
      initEditor()
    }).catch((err) => {
      console.log('err: ', err)
    })
  }
})

function destroyEditor() {
  if (!editor.value) return
  editor.value.off('change')
  editor.value.destroy()
  editor.value = null
}

onBeforeUnmount(() => {
  destroyEditor()
})

</script>

<style scoped lang="scss"></style>
