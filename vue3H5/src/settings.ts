interface SettingTy {
  storagePrefixKey: string
  logo: string
  title: string
  isNeedNprogress: boolean
  port: number
}

const setting: SettingTy = {
  storagePrefixKey: 'testApp_',
  logo: '',
  // 网页标题后缀
  title: '',
  isNeedNprogress: true,
  port: 8080,
}

export default setting
