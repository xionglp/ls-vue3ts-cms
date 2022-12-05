import { RouteRecordRaw } from "vue-router"

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context("../router/main", true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1])
    allRoutes.push(route.default)
  })

  // console.log("allRoutes: ", allRoutes)
  // console.log("userMenus: ", userMenus)

  // 2. 根据后台返回的菜单数据，获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const item of menus) {
      if (item.type === 2) {
        const route = allRoutes.find((route) => route.path === item.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(item.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
