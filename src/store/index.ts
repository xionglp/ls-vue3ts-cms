import { createStore, Store, useStore as useVuexStore } from "vuex"
import { IRootState, IStoreType } from "./types"
import loginModule from "./login/login-store"
import systemModule from "./main/system/system-store"

const store = createStore<IRootState>({
  state() {
    return {
      name: "Hello Vue.js"
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    loginModule,
    systemModule: systemModule
  }
})

export function setupStore() {
  store.dispatch("loginModule/loadLocalLogin")
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
