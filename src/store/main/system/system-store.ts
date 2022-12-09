import { Module } from "vuex"
import { ISystemState } from "./types"
import { IRootState } from "@/store/types"
import { getPageListData } from "@/service/main/system/system"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserlist(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      const pageResult = await getPageListData(payload.url, payload.queryInfo)
      // console.log(pageResult)
      const { list, totalCount } = pageResult.data
      commit("changeUserlist", list)
      commit("changeUserCount", totalCount)
    }
  }
}

export default systemModule
