import { useStore } from "@/store"

export function usePermission(pageName: string, handldeName: string) {
  const store = useStore()
  const permissions = store.state.loginModule.permissions
  const verifyPermission = `system:${pageName}:${handldeName}`

  return Boolean(permissions.find((item: string) => item === verifyPermission))
}
