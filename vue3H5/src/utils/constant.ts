import { VariablesTy } from '@/types/store'
import { RequestHeadersTy } from '@/types/common'

export const isTestEnv = !!import.meta.env.VITE_USE_TEST_API

export const CSS_VARIABLES_MAP: VariablesTy = {
  progressBar: '--progress-bar',
}

export const COMMON_HEADERS: RequestHeadersTy = {
  'x-app-id': '',
  // 'x-version': import.meta.env.VITE_BASE_VERSION,
  'x-version': '1.0.0',
  handleError: 1,
}
