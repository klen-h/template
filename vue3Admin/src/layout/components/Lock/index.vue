<template>
  <div
    class="lock-wrapper"
    @click="toggleClick"
  >
    <el-icon
      :size="20"
      color="#333"
    >
      <lock-outlined />
    </el-icon>

    <el-dialog
      v-model="showModal"
      :show-close="false"
      title="设置锁屏密码"
    >
      <el-form
        ref="formRef"
        :model="formParams"
        :rules="rules"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <el-form-item
          label="锁屏密码"
          prop="pwd"
        >
          <el-input
            v-model="formParams.pwd"
            type="password"
            show-password-on="mousedown"
            placeholder="请输入锁屏密码"
          />
        </el-form-item>
        <el-form-item
          label="二次确认"
          prop="ensurePwd"
        >
          <el-input
            v-model="formParams.ensurePwd"
            type="password"
            show-password-on="mousedown"
            placeholder="请再次输入锁屏密码"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-space>
          <el-button @click="() => toggleShowModal(false)">
            取消
          </el-button>
          <el-button
            type="primary"
            @click="confirmForm(formRef)"
          >
            确定
          </el-button>
        </el-space>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { LockOutlined } from '@vicons/antd'
import { useLockscreenStore } from '@/store/lockscreen'
import type { FormInstance, FormRules } from 'element-plus'

const [showModal, { toggle: toggleShowModal }] = useBoolean()
const formRef: any = ref<FormInstance>()
const useLockscreen = useLockscreenStore()
const password = computed(() => useLockscreen.password)

const formParams = reactive({
  pwd: '',
  ensurePwd: '',
})

const rules = reactive<FormRules>({
  pwd: [
    {
      required: true, message: '请输入锁屏密码', trigger: 'blur',
    },
  ],
  ensurePwd: [
    {
      required: true, message: '请再次输入锁屏密码', trigger: 'blur',
    },
  ],
})

const toggleClick = () => {
  // console.log(password)
  if (password.value) {
    useLockscreen.setLock(true, password.value)
  } else {
    toggleShowModal(true)
  }
  //   if(isShow)
}

// const confirmForm = (event) => {
//   event.preventDefault()
//   formRef.value.validate((errors) => {
//     if (!errors) {
//       if (formParams.pwd === formParams.ensurePwd) {
//         useLockscreen.setLock(true, formParams.ensurePwd)
//       } else {
//         showWarnMessage('两次输入的锁屏密码不一致!')
//       }
//     } else {
//       showWarnMessage('请填写完整信息')
//     }
//   })
// }

const confirmForm = async (formEl: FormInstance | undefined) => {
  // console.log(formEl)
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      // console.log(formParams.ensurePwd)
      if (formParams.pwd === formParams.ensurePwd) {
        useLockscreen.setLock(true, formParams.ensurePwd)
      } else {
        showWarnMessage('两次输入的锁屏密码不一致!')
      }
    } else {
      showWarnMessage('请填写完整信息')
    }
  })
}
</script>

<style scoped lang="scss">
.lock {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  &-wrapper {
    cursor: pointer;
    color: var(--nav-bar-click-text);
    display: inline-flex;
    align-items: center;
    margin-right: 12px;
  }
}

</style>
