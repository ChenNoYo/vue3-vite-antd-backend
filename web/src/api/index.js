/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 15:14:06
 * @LastEditTime: 2020-12-11 09:28:14
 */
import commonApi from './common.api'
import sysApi from './sys.api'
const api = {
  ...commonApi,
  ...sysApi
}
export default api