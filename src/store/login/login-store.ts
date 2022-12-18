import { Module } from "vuex"
import router from "@/router"
import localCache from "@/utils/local-cache"
import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus"

import { accountLoginRequest, requestUserInfoById } from "@/service/login/login"
import { requestUserMenusByRoleId } from "@/service/login/login"

import { IRootState } from "../types"
import { ILoginState } from "./login-types"
import { IAccount } from "@/service/login/types"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 动态加载路由
      const routes = mapMenusToRoutes(userMenus)
      // console.log("routes: ", routes)

      // 将routes添加到main的children中
      if (routes.length > 0) {
        routes.forEach((route) => {
          router.addRoute("main", route)
        })
      }

      // 获取用户的按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      // console.log(permissions)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit("changeToken", token)
      localCache.setCache("token", token)

      // 2. 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit("changeUserInfo", userInfo)
      localCache.setCache("userInfo", userInfo)

      // 3. 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit("changeUserMenus", userMenus)
      localCache.setCache("userMenus", userMenus)

      // 跳转到首页
      router.push("/main")
    },

    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("changeToken", token)
      }
      const userInfo = localCache.getCache("userInfo")
      if (userInfo) {
        commit("changeUserInfo", userInfo)
      }
      const userMenus = localCache.getCache("userMenus")
      if (userMenus) {
        commit("changeUserMenus", userMenus)
      }
    }
  }
}

export default loginModule
