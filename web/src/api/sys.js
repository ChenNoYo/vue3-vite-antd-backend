/*
 * @Descripttion:
 * @Author: NoYo
 * @Date: 2020-12-10 09:05:01
 * @LastEditTime: 2020-12-29 14:46:09
 */
import axios from './network'

export default {
	/**
	 * ********************************** 菜单 **********************************
	 */
	menu: {
		// 获取菜单树
		tree () {
			const url = '/sys/menu/tree'
			return axios.get(url)
		},
		// 获取菜单列表
		page (param) {
			const url = '/sys/menu/page'
			return axios.get(url, param)
		},
		// 新增菜单
		create (param) {
			const url = '/sys/menu/create'
			return axios.post(url, param)
		},
		// 编辑菜单
		update (param) {
			const url = '/sys/menu/update'
			return axios.post(url, param)
		},
		// 菜单详情
		detail (param) {
			const url = '/sys/menu/detail'
			return axios.get(url, param)
		},
		// 菜单删除
		del (param) {
			const url = '/sys/menu/del'
			return axios.post(url, param)
		},
	},
	/**
	 * ********************************** 角色 **********************************
	 */
	role: {
		// 获取角色权限列表
		page (param) {
			const url = '/sys/role/page'
			return axios.get(url, param)
		},
		// 新增角色
		create (param) {
			const url = '/sys/role/create'
			return axios.post(url, param)
		},
		// 编辑角色
		update (param) {
			const url = '/sys/role/update'
			return axios.post(url, param)
		},
		// 角色详情
		detail (param) {
			const url = '/sys/role/detail'
			return axios.get(url, param)
		},
		// 角色删除
		del (param) {
			const url = '/sys/role/del'
			return axios.post(url, param)
		},
	},
	/**
	 * ********************************** 权限 **********************************
	 */
	permission: {
		// 获取权限列表
		page (param) {
			Object.keys(param).forEach(key => {
				let value = param[key]
				if (!value) {
					delete param[key]
				} else {
					param[key] = typeof param[key] === 'string' ? param[key].trim() : param[key]
				}
			})
			const url = '/sys/permission/page'
			return axios.get(url, param)
		},
		// 新增权限
		create (param) {
			const url = '/sys/permission/create'
			return axios.post(url, param)
		},
		// 编辑权限
		update (param) {
			const url = '/sys/permission/update'
			return axios.post(url, param)
		},
		// 权限详情
		detail (param) {
			const url = '/sys/permission/detail'
			return axios.get(url, param)
		},
		// 删除权限
		del (param) {
			const url = '/sys/permission/del'
			return axios.post(url, param)
		}
	},
	/**
	 * ********************************** 用户 **********************************
	 */
	user: {
		// 获取角色列表
		page (param) {
			const url = '/sys/user/page'
			return axios.get(url, param)
		},
		// 新增权限
		create (param) {
			const url = '/sys/user/create'
			return axios.post(url, param)
		},
		// 编辑权限
		update (param) {
			const url = '/sys/user/update'
			return axios.post(url, param)
		},
		// 权限详情
		detail (param) {
			const url = '/sys/user/detail'
			return axios.get(url, param)
		},
		// 删除权限
		del (param) {
			const url = '/sys/user/del'
			return axios.post(url, param)
		}
	},
	/**
	 * ********************************** 配置 **********************************
	 */
	config: {
		// 获取配置列表
		page (param) {
			const url = '/sys/config/page'
			return axios.get(url, param)
		}
	}

}
