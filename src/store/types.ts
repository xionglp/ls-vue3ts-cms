import { ILoginState } from "./login/login-types"

export interface IRootState {
  name: string
  age?: number
}

export interface IRootWithModule {
  loginModule: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
