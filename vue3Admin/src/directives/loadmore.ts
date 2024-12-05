import { DirectiveBinding } from 'vue'
import settings from '@/settings'

export default {

  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { namespace } = settings
    const SELECTWRAP = document.querySelector(
      `.${binding.value.class} .${namespace}-select-dropdown .${namespace}-select-dropdown__wrap`,
    )
    // eslint-disable-next-line func-names
    SELECTWRAP.addEventListener('scroll', function () {
      const CONDITION = this.scrollTop + this.clientHeight >= this.scrollHeight - 20
      if (CONDITION) {
        binding.value.fetcher()
      }
    })
  },
}
