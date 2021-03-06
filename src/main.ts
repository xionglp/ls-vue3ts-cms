import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/index"
import store from "@/store/index"
import "normalize.css"
import "./assets/css/index.less"
import { setupStore } from "@/store/index"

// 集成elementPlus
import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
// import lsRequest from "./service"

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store)
app.use(ElementPlus)

setupStore()
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

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// lsRequest
//   .get<DataType>({
//     url: "/home/multidata"
//   })
//   .then((res) => {
//     console.log("拿到的数据：", res.data)
//   })
