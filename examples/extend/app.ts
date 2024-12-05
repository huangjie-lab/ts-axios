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

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
  pwd: number
}

const getUser = <T>() => {
  return axios<ResponseData<T>>('/extend/user')
}
const test = async () => {
  try {
    const { data, status } = await getUser<User>()
    if (/^2/.test(status.toString())) {
      console.log(data.result.age)
    }
  } catch (e) {}
}

test()
