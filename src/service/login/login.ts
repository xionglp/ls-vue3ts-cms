import lsRequest from "../index"
import { IAccount, IDataType, ILoginResult } from "./types"

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // 用法： /users/1
  UserMenus = "/role/" // 用法： role/1/menu
}

// 登录接口
export function accountLoginRequest(account: IAccount) {
  return lsRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 请求用户信息
export function requestUserInfoById(id: number) {
  return lsRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

// 请求用户菜单
export function requestUserMenusByRoleId(id: number) {
  return lsRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu"
  })
}
