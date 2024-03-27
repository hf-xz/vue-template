// API 实例工厂

import type { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import type { PluginOptions as ToastOptions } from 'vue-toastification'
import axios from 'axios'
import toast from '@/plugins/toast'

/**
 * API 配置
 * @param name API 名称
 * @param useToken 是否使用 token，默认 false
 * @param getToken 获取 token 的方法，默认 localStorage
 * @param saveToken 保存 token 的方法，默认 localStorage
 * @param toastLevel toast 等级，默认 error
 * @param toastOptions toast 配置，默认全局配置
 * @param toastSuccessMessage 成功 toast 消息，默认返回 response.data.message 或 '请求成功'
 * @param toastErrorMessage 失败 toast 消息，默认返回 error.response.data.message 或 '请求失败'
 * @param requestInterceptor 请求拦截器，默认无
 * @param responseInterceptor 响应拦截器，默认无
 */
export interface APIConfig {
  name: string
  axiosOptions?: AxiosRequestConfig
  useToken?: boolean
  getToken?: () => string
  saveToken?: (token: string) => void
  toastLevel?: ToastLevel
  toastOptions?: ToastOptions
  toastSuccessMessage?: (respones: AxiosResponse) => string
  toastErrorMessage?: (error: AxiosError) => string
  requestInterceptor?: Parameters<AxiosInstance['interceptors']['request']['use']>
  responseInterceptor?: Parameters<AxiosInstance['interceptors']['response']['use']>
}

// toast 等级
export enum ToastLevel {
  none = 0,
  error = 1,
  all = 2
}

// 默认 axios 配置
const defualtAxiosOptions: AxiosRequestConfig = {
  timeout: 10000
}

// 声明 API class
export class API {
  readonly config: APIConfig
  private axios: AxiosInstance
  private toast: ReturnType<typeof useToast>

  constructor(config: APIConfig) {
    // 配置
    this.config = {
      axiosOptions: defualtAxiosOptions,
      useToken: false,
      toastLevel: ToastLevel.error,
      toastOptions: toast.options,
      ...config
    }
    this.config.getToken =
      config.getToken ?? (() => localStorage.getItem(`api-${this.config.name}-token`) ?? '')
    this.config.saveToken =
      config.saveToken ?? ((token) => localStorage.setItem(`api-${this.config.name}-token`, token))
    this.config.toastSuccessMessage =
      config.toastSuccessMessage ?? ((response) => response.data.message || '请求成功')
    this.config.toastErrorMessage =
      config.toastErrorMessage ??
      ((error) =>
        '请求失败：' + error.message ||
        (error.response?.data as { message?: string }).message ||
        '无更多信息')

    // 实例
    this.axios = axios.create(this.config.axiosOptions)
    this.toast = useToast()

    // 初始化
    this.init()
  }

  private init() {
    // axios
    // --- 请求拦截器 ---
    if (this.config.requestInterceptor) {
      this.axios.interceptors.request.use(...this.config.requestInterceptor)
    }
    // 添加 token
    if (this.config.useToken) {
      this.axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${this.config.getToken!()}`
        return config
      })
    }
    // --- 响应拦截器 ---
    if (this.config.responseInterceptor) {
      this.axios.interceptors.response.use(...this.config.responseInterceptor)
    }
    this.axios.interceptors.response.use(
      (response) => {
        if (this.config.toastLevel! >= ToastLevel.all) {
          this.toast.success(this.config.toastSuccessMessage!(response))
        }
        return response
      },
      (error) => {
        if (this.config.toastLevel! >= ToastLevel.error) {
          this.toast.error(this.config.toastErrorMessage!(error))
        }
        return Promise.reject(error)
      }
    )
  }

  // 请求方法
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axios.get<T>(url, config)
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.post<T>(url, data, config)
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.put<T>(url, data, config)
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete<T>(url, config)
  }
}
