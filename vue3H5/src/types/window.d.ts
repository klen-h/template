import { ObjTy } from '@/types/common'

interface RefreshUserFunction {
  (user: ObjTy): Promise;
}

declare global {
  interface Window {
    FrontEndOssUploadClient: ObjTy
  }
}
