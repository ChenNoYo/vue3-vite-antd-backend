/*
 * @Descripttion:
 * @Author: NoYo
 * @Date: 2020-12-10 09:05:01
 * @LastEditTime: 2020-12-29 14:46:09
 */
import axios from './network.api'

export default {
	// 菜单
	// 获取菜单树
	getMenuTree () {
		const url = '/sys/menu/tree'
		return axios.get(url)
	},
	// 获取菜单列表
	getMenuPage (param) {
		const url = '/sys/menu/page'
		return axios.get(url, param)
	},
	// 新增菜单
	createMenu (param) {
		const url = '/sys/menu/create'
		return axios.post(url, param)
	},
	// 编辑菜单
	updateMenu (param) {
		const url = '/sys/menu/update'
		return axios.post(url, param)
	},
	// 菜单详情
	getMenuDetail (param) {
		const url = '/sys/menu/detail'
		return axios.get(url, param)
	},
	// 菜单详情
	delMenu (param) {
		const url = '/sys/menu/del'
		return axios.post(url, param)
	}
}
