/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 15:14:05
 * @LastEditTime: 2021-01-29 14:39:13
 */
import { create } from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue';
import router from "../router/index.js";
import {
  baseUrl
} from '../environment/index.js'
const axios = create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  baseURL: baseUrl
})


/**
 * 请求报错统一处理
 */
let axiosErrorHandler = (code, msg) => {
  if ((code >= 200 && code < 300) || code === 304) {
    return true
  } else if (code === 401) {
    message.warn(msg, 1, () => {
      router.push({ path: '/Login' })
    })
    return true
  } else if (code === 500) {
    message.error({ content: msg || '未知错误', key: 'message' })
    return false
  } else {
    message.warn({ content: msg || '未知错误', key: 'message' })
    return false
  }
}

// 请求拦截器
axios.interceptors.request.use(
  res => {
    return res
  },
  err => {
    return Promise.reject(err)
  })

// 响应拦截器
axios.interceptors.response.use(
  res => {
    res.data.isSuccess = axiosErrorHandler(res.data.status, res.data.message)
    if (res.data.isSuccess) {
      return Promise.resolve(res.data.response)
    } else {
      return Promise.reject(res.data.message)
    }
  },
  err => {
    return Promise.reject(err)
  })
// get，post请求方法
export default {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params
    })
  }
}
