import { AxiosRequestConfig, AxiosResponse, AxiosErrorType } from '../types'

// 定义一个统一错误类
export default class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(message, config, code, request, response) {
    super(message)
    this.isAxiosError = true
    this.config = config
    this.code = code
    this.request = request
    this.response = response

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

// 创造一个工厂函数来创建实例
export function createError({
  message,
  config,
  code,
  request,
  response
}: AxiosErrorType): AxiosError {
  return new AxiosError(message, config, code, request, response)
}
