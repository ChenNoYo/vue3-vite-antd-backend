/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 09:05:01
 * @LastEditTime: 2020-12-29 14:46:09
 */
import axios from './network.api'

export default {
  // 用户
  sysLogin (data) {
    const url = '/sys/login'
    return axios.post(url, data)
  },
  getUser (data) {
    const url = '/sys/getUser'
    return axios.get(url)
  },
  logout () {
    const url = '/sys/logout'
    return axios.post(url)
  },
  // 菜单
  getMenuTree () {
    const url = '/sys/getMenuTree'
    return axios.get(url)
  }
}