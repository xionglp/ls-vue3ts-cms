import lsRequest from "../index"
import { IAccount } from "./types"

export function accountLoginRequest(account: IAccount) {
  return lsRequest.post({
    url: "/login",
    data: account
  })
}
