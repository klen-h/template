import { STORAGE_KEY } from '@/utils/constant'
import { defineStore } from 'pinia'

export const useTableStore = defineStore({
  id: 'table',
  state: () => ({
    tableSize: localStorage.getItem(STORAGE_KEY.TABLE_SIZE) || 'default',
  }),
  actions: {
    setTableSize(size) {
      this.tableSize = size
      localStorage.setItem(STORAGE_KEY.TABLE_SIZE, size)
    },
  },
})
