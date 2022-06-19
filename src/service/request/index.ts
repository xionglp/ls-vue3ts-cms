import axios from "axios"
import type { AxiosInstance } from "axios"
import type { LSRequestConfig, LSRequestInterceptors } from "./type"

class LSRequest {
  instance: AxiosInstance
  interceptors?: LSRequestInterceptors

  constructor(config: LSRequestConfig) {
    // 1. 创建axios实例
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 2. 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 3. 添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("所有实例都有的拦截器：请求成功拦截")
        return config
      },
      (error) => {
        console.log("所有实例都有的拦截器：请求失败拦截")
        return error
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log("所有实例都有的拦截器：响应成功拦截")
        return res
      },
      (error) => {
        console.log("所有实例都有的拦截器：响应失败拦截")
        return error
      }
    )
  }

  request(config: LSRequestConfig): void {
    // 1. 单个请求对请求的config处理
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res: any) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default LSRequest
