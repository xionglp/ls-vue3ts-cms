import axios from "axios"
import type { AxiosInstance } from "axios"
import type { LSRequestConfig, LSRequestInterceptors } from "./type"
import { ElLoading } from "element-plus"

class LSRequest {
  instance: AxiosInstance
  interceptors?: LSRequestInterceptors
  loading?: any
  showLoading?: boolean

  constructor(config: LSRequestConfig) {
    // 1. 创建axios实例
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true

    // 2. 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(this.interceptors?.requestInterceptor, this.interceptors?.requestInterceptorCatch)
    this.instance.interceptors.response.use(this.interceptors?.responseInterceptor, this.interceptors?.responseInterceptorCatch)

    // 3. 添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (configs) => {
        // console.log("所有实例都有的拦截器：请求成功拦截")
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据....",
            background: "rgba(0, 0, 0, 0.5)"
          })
        }
        return configs
      },
      (error) => {
        return error
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log("所有实例都有的拦截器：响应成功拦截")
        this.loading?.close()
        if (res.data.returnCode === "-1001") {
          console.log("请求失败，错误信息")
        } else {
          return res.data
        }
      },
      (error) => {
        this.loading?.close()
        if (error.response.statue === 404) {
          console.log("404错误----")
        }
        return error
      }
    )
  }

  request<T>(config: LSRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 单个请求对请求的config处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2. 判断是否要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance.request(config).then(
        (res: any) => {
          // 1. 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = true

          // 3. 将结果通过resolve返回出去
          resolve(res)
        },
        (err: any) => {
          this.showLoading = true
          reject(err)
          console.log(err)
        }
      )
    })
  }

  get<T = any>(config: LSRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T = any>(config: LSRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T = any>(config: LSRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T = any>(config: LSRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default LSRequest
