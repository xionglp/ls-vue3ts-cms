import LSRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"
// import { AxiosRequestConfig } from "axios"

const lsRequest = new LSRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log("单个实例：请求成功拦截---")
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log("单个实例：请求失败拦截---")
      return error
    },
    responseInterceptor: (res) => {
      console.log("单个实例：相应成功拦截---")
      return res
    },
    responseInterceptorCatch: (error) => {
      console.log("单个实例：相应失败拦截---")
      return error
    }
  }
})

export default lsRequest
