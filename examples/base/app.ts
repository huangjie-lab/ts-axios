import axios from '../../src/index'

// data 为普通对象的时候，headers 如果没有配置 Content-Type 属性，
// 需要自动设置请求 header 的 Content-Type 字段为：application/json;charset=utf-8
// 当 data 是某些类型如 URLSearchParams 的时候，浏览器会自动为请求 header加上合适的 Content-Type
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res, 'res1')
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;'
  },
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log(res, 'res2')
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})
