/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 09:05:01
 * @LastEditTime: 2020-12-11 11:50:37
 */
import axios from './network.api'

export default {
  sysLogin (data) {
    const url = '/sys/login'
    return axios.post(url, data)
  },
  getUser (data) {
    const url = '/sys/getUser'
    return axios.get(url)
  }
}