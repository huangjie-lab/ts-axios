import axios from '../../src/index'
import { AxiosErrorType } from '../../src/types'

axios({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosErrorType) => {
    // request failed with status code 404
    console.log(e.message)
    console.log(e.config)
  })

// 以下两个随机返回
// request failed with status code 500
// 或者响应正常的数据
axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosErrorType) => {
    console.log(e.message)
    console.log(e.config)
  })

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e.message)
    })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosErrorType) => {
    // timeout out of 2000 ms exceeded
    console.log(e.message)
    console.log(e.config)
  })
