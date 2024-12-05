import { ArgsType, FnType } from '@/types/common'

const useSubmitLock = (fn: FnType) => {
  const [isSubmit, { toggle: toggleIsSubmit }] = useBoolean()
  return async (...args: ArgsType) => {
    if (isSubmit.value) return
    toggleIsSubmit(true)
    try {
      const res = await fn(...args)
      toggleIsSubmit(false)
      // eslint-disable-next-line consistent-return
      return res
    } catch (error) {
      toggleIsSubmit(false)
      throw error
    }
  }
}

export { useSubmitLock }
