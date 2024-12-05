import Axios from './core/axios'
import { extend } from './helpers/util'
import { AxiosInstance } from './types'

// 混合对象，本质是一个函数，但是兼具对象拥有的方法
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()
export default axios
