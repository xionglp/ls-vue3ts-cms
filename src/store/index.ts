import { createStore } from "vuex"
import { IRootState } from "./types"
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

export default store
