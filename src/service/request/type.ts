import { AxiosRequestConfig, AxiosResponse } from "axios"

export interface LSRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface LSRequestConfig extends AxiosRequestConfig {
  interceptors?: LSRequestInterceptors
  showLoading?: boolean
}
