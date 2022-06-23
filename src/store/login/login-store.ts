import { Module } from "vuex"
import { IRootState } from "../types"
import { ILoginState } from "./login-types"

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
    accountLoginAction({ commit }, payload) {
      console.log("实现登录逻辑", commit)
      console.log(payload)
    }
  }
}

export default loginModule
