<template>
  <div class="app-vue">
    <Home />
    <router-view />
  </div>
</template>
<script>
import Home from '@/views/Home.vue'
import { initShare, uploadStatics } from '@/common/utils/app-adaptation'
import { debounce } from '@/common/utils/index'

const reportThresholds = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000]
let lastReportedThreshold = 0

export default {
  name: 'App',
  components: {
    Home,
  },
  data() {
    return {}
  },
  async created() {
    this.init()
  },
  mounted() {
    initShare()
    this.upLoadPagePosition()
    window.addEventListener('scroll', debounce(this.scrollEvent, 1000))
    this.startUploadOnlieTime()
    document.addEventListener('visibilitychange', () => {
      this.onlineTimer && clearInterval(this.onlineTimer)
      if (document.visibilityState === 'visible') {
        this.startUploadOnlieTime()
      }
    })
  },
  methods: {
    init() {
      // 初始化
    },
    upLoadPagePosition() {
      // 页面区间
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const currentPosition = Math.floor(scrollTop + windowHeight)
      console.log('当前位置: ', currentPosition)
      for (let i = 0; i < reportThresholds.length; i++) {
        const threshold = reportThresholds[i]
        const nextThreshold = reportThresholds[i + 1] || Infinity
        if (currentPosition >= threshold && currentPosition < nextThreshold
          && threshold !== lastReportedThreshold) {
          // 上报埋点
          uploadStatics({
            action: '滚动高度',
            type: null,
            object: threshold,
          })
          lastReportedThreshold = threshold
        }
      }
    },
    scrollEvent() {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const progress = scrollTop / documentHeight
      // 保留两位小数(滚动进度)
      const scrollProgress = (parseFloat(progress * 100) / 100).toFixed(2)
      uploadStatics({
        action: '滚动',
        type: null,
        object: scrollProgress,
      })
      this.upLoadPagePosition()
    },
    startUploadOnlieTime() {
      this.enterTime = Date.now()
      this.onlineTimer = setInterval(() => {
        const stayDuration = Math.floor((Date.now() - this.enterTime) / 1000)
        uploadStatics({
          action: '停留时长',
          type: null,
          params: {
            operate: '间隔',
            online_time: stayDuration,
          },
        })
      }, 5e3)
    },
  },
}
</script>
