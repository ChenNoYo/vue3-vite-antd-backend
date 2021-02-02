import { createRouter, createWebHashHistory } from 'vue-router'
import { render } from 'vue'
import api from '../api'
import store from '../store'
function load(path) {
	return () => import(`/@/views/${path}/layout.vue`)
}
import layout from '/@/views/layout'
import noPage from '/@/views/404/layout'
const routes = [
	{
		path: '/login',
		name: 'login',
		// component: load('login')
		component: () => import(`/@/views/login`)
	},
	{
		path: '/',
		name: '/',
		rediect: '/home',
		component: layout,
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import(`/@/views/home`)
			}
		]
	},
	{
		path: '/sys',
		name: 'sys',
		component: layout,
		children: [
			{
				path: '/menu',
				name: 'menu',
				component: () => import(`/@/views/sys/menu`)
			},
			{
				path: '/role',
				name: 'role',
				component: () => import(`/@/views/sys/role`)
			}
		]
	}
]

let router = createRouter({
	history: createWebHashHistory(),
	routes
})
let hasGetUser = false
router.beforeEach((to, from, next) => {
	if (to.path === 'Login' || to.path === '/Login' || to.path === '/login') {
		next()
	} else {
		if (hasGetUser) {
			next()
		} else {
			api.getUser().then((res) => {
				hasGetUser = true
				if (res.response && res.response.user) {
					store.commit('user/setUser', res.response.user)
				}
				next()
			})
		}
	}
})
router.afterEach((to) => {})

export default router
