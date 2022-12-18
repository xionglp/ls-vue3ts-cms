import { Module } from "vuex"
import { ISystemState } from "./types"
import { IRootState } from "@/store/types"
import { getPageListData, deletePageData } from "@/service/main/system/system"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      // 1.获取page的url
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      // console.log("数据: ", list)

      switch (pageName) {
        case "users":
          commit("changeUsersList", list)
          commit("changeUsersCount", totalCount)
          break
        case "role":
          commit("changeRoleList", list)
          commit("changeRoleCount", totalCount)
          break
        case "goods":
          commit("changeGoodsList", list)
          commit("changeGoodsCount", totalCount)
          break
        case "menu":
          commit("changeMenuList", list)
          commit("changeMenuCount", totalCount)
          break
      }
    },

    async deletePageDataAction({ dispatch }, payload) {
      // 1.获取pageName和id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      console.log(pageUrl)

      // 2.调用删除网络请求
      await deletePageData(pageUrl)

      // 3.重新请求列表数据
      dispatch("getPageListAction", {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
