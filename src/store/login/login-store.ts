import { Module } from "vuex"
import { IRootState } from "../types"
import { ILoginState } from "./login-types"
import { IAccount } from "@/service/login/types"
import { accountLoginRequest } from "@/service/login/login"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {},
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log(commit)
      const loginResult = await accountLoginRequest(payload)
      console.log("登录结果", loginResult)
    }
  }
}

export default loginModule
