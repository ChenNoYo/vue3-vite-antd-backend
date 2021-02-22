import { createRouter, createWebHashHistory } from 'vue-router'

// import asyncRoutes from './asyncRoutes'

const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'login',
		meta: { title: 'login' },
		component: () => import('/@/views/login')
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		meta: { title: '404' },
		component: () => import('/@/views/404/')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
