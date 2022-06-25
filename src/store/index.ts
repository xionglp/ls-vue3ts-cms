import { createStore, Store, useStore as useVuexStore } from "vuex"
import { IRootState, IStoreType } from "./types"
import loginModule from "./login/login-store"

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
    loginModule
  }
})

export function setupStore() {
  store.dispatch("loginModule/loadLocalLogin")
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
