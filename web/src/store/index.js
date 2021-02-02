/*
 * @Descripttion:
 * @Author: NoYo
 * @Date: 2020-12-09 14:56:59
 * @LastEditTime: 2020-12-29 16:45:11
 */
import { createStore } from 'vuex'
import user from './modules/user'

export default createStore({
	modules: {
		user
	}
})
