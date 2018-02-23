import axios from 'axios'
import store from '@/store'

let service = axios.create({
  headers: {}
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(sessionStorage.getItem('authorization')){
    config.headers['Authorization'] = sessionStorage.getItem('authorization')
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})


// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.errcode == '40401') {
    localStorage.removeItem('authorization')
    setTimeout(()=>{
      window.location.href = `${process.env.URL.URL}/#/login`
    },1000)
    return false
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service
