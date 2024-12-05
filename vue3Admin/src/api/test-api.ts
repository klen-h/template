import axios from 'axios'
/** 列表 */
export function getTopList() {
  return axios.get('/api/user')
}

/* 性别 */
export function getGender() {
  return axios.get('/api/gender')
}
