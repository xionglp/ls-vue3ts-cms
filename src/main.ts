import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/index"
import store from "@/store/index"

import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"

import { BASE_URL, TIME_OUT } from "@/service/request/config"

// import "./service/axios-demo"

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount("#app")

console.log(BASE_URL, TIME_OUT)
console.log(process.env.VUE_APP_BASE_URL)
