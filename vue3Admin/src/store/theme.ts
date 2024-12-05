import { defineStore } from 'pinia'
import { ThemeTy, VariablesParamTy } from '@/types/store'
import { CSS_VARIABLES_MAP } from '@/utils/constant'

const rootStyle = getComputedStyle(document.documentElement)
const root = document.documentElement

export const useThemeStore = defineStore({
  id: 'theme', // id必填，且需要唯一
  state: (): ThemeTy => {
    const variables = {}
    Object.keys(CSS_VARIABLES_MAP).forEach((key) => {
      variables[key] = rootStyle.getPropertyValue(CSS_VARIABLES_MAP[key])
    })
    return {
      variables,
    }
  },
  actions: {
    changeVariables(variablesParam: VariablesParamTy = {}) {
      const variables = {}
      Object.keys(variablesParam).forEach((key) => {
        this.variables[key] = variablesParam[key]
        root.style.setProperty(CSS_VARIABLES_MAP[key], variablesParam[key])
      })
      this.variables = {
        ...this.variables, ...variables,
      }
    },
  },
})
