/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 15:14:06
 * @LastEditTime: 2020-12-09 16:55:40
 */
import axios from './network.api'

export default {
  // 获取首页信息
  getHomeInfo () {
    return axios.get(`/home/info`)
      .then((res) => {
        return Promise.resolve(res.data)
      })
  }
}