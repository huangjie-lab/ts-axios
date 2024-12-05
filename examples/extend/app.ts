import axios from '../../src/index'

axios({
  url: '/base/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/base/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/simple/get', {
  params: {
    a: 1,
    b: 2
  }
})
