import { RouteRecordRaw } from "vue-router"
import { IBreadcrumb } from "@/base-ui/breadcrumb"

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context("../router/main", true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1])
    allRoutes.push(route.default)
  })

  // 2. 根据后台返回的菜单数据，获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const item of menus) {
      if (item.type === 2) {
        const route = allRoutes.find((route) => {
          return route.path === item.url
        })
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = item
        }
      } else {
        _recurseGetRoute(item.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}

export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2 && currentPath === menu.url) {
      return menu
    }
  }
}

export function pathMapToBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs.push({ name: menu.name })
        breadcrumbs.push({ name: findMenu.name })
      }
    } else if (menu.type === 2 && currentPath === menu.url) {
      return menu
    }
  }
  return breadcrumbs
}

export { firstMenu }
