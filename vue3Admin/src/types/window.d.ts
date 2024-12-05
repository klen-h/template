import { ObjTy } from '@/types/common'

declare global {
  interface Window {
    $debugout: ObjTy
    toastui: ObjTy
    pdfjsLib: ObjTy
    FrontEndOssUploadClient: ObjTy
  }
}