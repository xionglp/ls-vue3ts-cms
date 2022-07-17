import { createRouter, createWebHashHistory } from "vue-router"
import { RouteRecordRaw } from "vue-router"
import localCache from "@/utils/local-cache"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "name",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/not-found/not-found.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token")
    if (!token) {
      return "/login"
    }
  }
})

export default router
