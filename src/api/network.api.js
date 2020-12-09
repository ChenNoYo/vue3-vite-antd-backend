/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 15:14:05
 * @LastEditTime: 2020-12-09 16:55:14
 */

/**
 * 设置axios拦截器，然后输出axios,其他页面从此文件引入axios
 */

import axios from 'axios'
import { message } from 'ant-design-vue';
import {
  baseUrl
} from '../environment/index.js'
axios.defaults.baseURL = baseUrl


/**
 * 请求报错统一处理
 */
let axiosErrorHandler = (code, msg) => {
  if (code === 302) {
    console.log('302:服务器异常重定向！', 2200)
    return false
  } else if (code === 400) {
    console.log('400:请求参数错误！' + msg, 2200)
    return false
  } else if (code === 401) {
    console.log('用户无权限')
    return false
  } else if (code === 403) {
    console.log('403:服务器拒绝请求！', 2200)
    return false
  } else if (code === 404) {
    console.log('404:服务器找不到请求的资源！', 2200)
    return false
  } else if (code === 405) {
    console.log('405:服务器找不到请求的资源或方法！', 2200)
    return false
  } else if (code === 408) {
    console.log('408:服务器等候请求时发生超时！', 2200)
    return false
  } else if (code === 410) {
    console.log('410:请求的资源已永久删除！', 2200)
    return false
  } else if (code === 413) {
    console.log('413:服务器无法处理请求，因为请求实体过大，超出服务器的处理能力！', 2200)
    return false
  } else if (code === 414) {
    console.log('414:请求的网址过长，服务器无法处理！', 2200)
    return false
  } else if (code === 415) {
    console.log('415:请求的格式不受请求页面的支持！', 2200)
    return false
  } else if (code === 500) {
    console.log('500:服务器遇到错误，无法完成请求！', 2200)
    return false
  } else if (code === 502) {
    console.log('502:服务器网关错误！', 2200)
    return false
  } else if (code === 503) {
    console.log('503:服务器由于超载或停机维护目前无法使用！', 2200)
    return false
  } else if (code === 504) {
    console.log('504:服务器由于超载或停机维护目前无法使用！', 2200)
    return false
  } else if (code === 505) {
    console.log('505:服务器不支持请求中所用的HTTP协议版本！', 2200)
    return false
  } else if (code !== 200) {
    return false
  } else {
    return true
  }
}

axios.interceptors.request.use(
  res => {
    return res
  },
  res => {
    console.dir('客户端请求错误', res)
    return res
  })

axios.interceptors.response.use(
  res => {
    res.data.isSuccess = axiosErrorHandler(res.data.status)
    return res
  },
  res => {
    if (!res.data) {
      res.isSuccess = undefined
    }
    res.data.isSuccess = axiosErrorHandler(res.status)
    return res
  })

export default axios