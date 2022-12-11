import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/index"
import store from "@/store/index"
import "normalize.css"
import "./assets/css/index.less"
import { setupStore } from "@/store/index"
import { globalRegister } from "./global"

// 集成elementPlus
import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
// import lsRequest from "./service"

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(ElementPlus)
app.use(globalRegister)
setupStore()
app.use(router)

app.mount("#app")
