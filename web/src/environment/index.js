/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 16:45:19
 * @LastEditTime: 2020-12-09 16:45:20
 */
let baseUrl, serverUrl
if (!['production', 'prod'].includes(process.env.NODE_ENV)) {
  baseUrl = 'api/'
  serverUrl = '127.0.0.1'
} else {
  baseUrl = '/'
  serverUrl = '129.211.187.203'
}
export {
  baseUrl,
  serverUrl
}