// 二次封装axios请求

// 引入axios
import Axios from 'axios'
import envComfig from './env'
import { Message } from 'element-ui'

const service = Axios.create({
  baseURL: envComfig.prod.baseURL,
  timeout: 5000
})

// 创建请求拦截器
service.interceptors.request.use(
  (config) => {
    console.log(config)
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 创建响应拦截器
service.interceptors.response.use(
  (res) => {
    console.log('res::', res)
    const {
      data: result,
      meta: { msg, status: code }
    } = res.data

    const successCodeArray = [200, 201, 204]
    if (successCodeArray.includes(code)) {
      Message({
        message: msg,
        type: 'success'
      })
      if (res.config.url === '/login') {
        sessionStorage.setItem('token', result.token)
      }

      return result
    }

    Message({
      message: msg,
      type: 'error'
    })

    return Promise.reject(msg)
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
