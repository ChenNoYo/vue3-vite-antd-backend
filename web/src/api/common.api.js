/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 09:05:01
 * @LastEditTime: 2020-12-29 13:59:17
 */
/**
 * Created by kwj on 2017/7/4
 * 公共接口调用
 */

import axios from './network.api'

export default {
  getUser () {
    return axios.get(`/users`)
      .then((res) => {
        return Promise.resolve(res.data)
      })
  },
  login (data) {
    const url = '/user/login'
    return axios.post(url, data)
  },
  getConfigs () {
    return axios.get(`/common/configs`)
      .then((res) => {
        return Promise.resolve(res.data)
      })
  },
  upload (file, data) {
    return axios.post(`/common/upload/${file}`, data)
      .then((res) => {
        return Promise.resolve(res.data)
      })
  },
}