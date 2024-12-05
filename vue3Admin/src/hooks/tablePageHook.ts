import {
  onMounted, reactive, ref,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ObjTy, tablePageHookParamTy } from '@/types/common'

export default ({
  filters = {},
  getTableData = (() => { console.log('missing getTableData param') }),
  excludeKeys = [],
  numberKeys = [],
  objectKeys = [],
}: tablePageHookParamTy) => {
  const tableData = ref([])
  const filtersParam = reactive(filters)
  const route = useRoute()
  const router = useRouter()

  const initFiltersFromQuery = () => {
    const { query } = route
    Object.entries(query).forEach(([key, value]) => {
      if (key in filtersParam) {
        if (!excludeKeys.includes(key)) {
          let newValue: string|number|ObjTy = value
          if (['page', 'pageSize', ...numberKeys].includes(key)) newValue = +value
          if (objectKeys.includes(key)) {
            console.log(value)
            newValue = JSON.parse(value as string)
          }
          filtersParam[key] = newValue
        }
      }
    })
  }
  initFiltersFromQuery()

  const setQueryToUrl = () => {
    if (!Object.keys(filtersParam).length) return
    const filtersQuery = {}
    Object.entries(filtersParam).forEach(([key, value]) => {
      filtersQuery[key] = objectKeys.includes(key) && value !== null ? JSON.stringify(value) : value
    })
    const { query } = route
    const newQuery = {
      ...query,
      ...filtersQuery,
    }
    Object.entries(newQuery).forEach(([key, value]) => {
      if ((!value && value !== 0) || excludeKeys.includes(key)) {
        delete newQuery[key]
      }
    })

    router.replace({
      query: {
        ...newQuery,
      },
    })
  }

  const handlePageChange = (val: number) => {
    filtersParam.page && (filtersParam.page = val)
    getTableData()
    setQueryToUrl()
  }
  const handleSizeChange = (val: number) => {
    filtersParam.page && (filtersParam.page = 1)
    filtersParam.pageSize && (filtersParam.pageSize = val)
    getTableData()
    setQueryToUrl()
  }
  onMounted(() => {
    getTableData()
    setQueryToUrl()
  })
  return {
    filters: filtersParam,
    tableData,
    handlePageChange,
    handleSizeChange,
  }
}
