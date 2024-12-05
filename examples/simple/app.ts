import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})

axios('/simple/get', {
  method: 'get',
  params: {
    a: 3,
    b: 4
  }
})
