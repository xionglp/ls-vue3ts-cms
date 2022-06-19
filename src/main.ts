import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/index"
import store from "@/store/index"
// 集成elementPlus
import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"

import lsRequest from "./service"

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount("#app")

// lsRequest.request({
//   url: "/home/multidata",
//   method: "GET",
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log("单个请求的拦截")
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log("单个请求 响应拦截")
//       return res
//     }
//   }
// })

lsRequest.request({
  url: "/home/multidata",
  method: "GET"
})
