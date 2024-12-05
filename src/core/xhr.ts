import { parseHeaders } from '../helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)

    if (timeout) {
      request.timeout = timeout
    }

    // 没有传递data则不需要content-type
    Object.keys(headers).forEach(name => {
      if (data === null && name.toUpperCase() === 'CONTENT-TYPE') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    // 捕获超时
    request.ontimeout = () => {
      reject(
        createError({
          message: `timeout out of ${timeout} ms exceeded`,
          config,
          code: null,
          request
        })
      )
    }
    // 捕获网络错误
    request.onerror = () => {
      reject(
        createError({
          message: `network error`,
          config,
          code: null,
          request
        })
      )
    }

    // 处理响应结果数据
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      // 解析一下请求头
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      function handleResponse(response) {
        const { status } = response
        if (/^2/.test(status)) {
          resolve(response)
        } else {
          reject(
            createError({
              message: `request failed with status code ${status}`,
              config,
              code: null,
              request,
              response
            })
          )
        }
      }
      handleResponse(response)
    }
  })
}
