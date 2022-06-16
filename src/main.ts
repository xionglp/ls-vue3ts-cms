import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/index"
import store from "@/store/index"

// import ElementPlus from "element-plus"
import { globalRegister } from "./global/index"
import "element-plus/theme-chalk/index.css"

const app = createApp(App)

globalRegister(app)

app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount("#app")
