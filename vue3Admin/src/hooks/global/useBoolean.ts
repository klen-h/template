import { Ref } from 'vue'

// 默认值
const defaultValue = false

interface Actions{
    toggle: (param?: boolean)=> void;
    setTrue: ()=> void;
    setFalse: ()=> void;
}

function useBoolean(
    value?: boolean
): [Ref<boolean>, Actions]
/**
 * 切换布尔值状态(弹窗、loading等场景)
 * @param defaultValue
 * @returns
 */
function useBoolean(value: boolean = defaultValue) {
  const [state, [toggle]] = useToggle(value, !value)

  const setTrue = () => toggle(true)
  const setFalse = () => toggle(false)

  const actions: Actions = {
    toggle, setTrue, setFalse,
  }
  return [state, actions]
}

export { useBoolean }
