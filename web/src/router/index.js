import { createRouter, createWebHistory } from 'vue-router'

// import asyncRoutes from './asyncRoutes'

const routes = [
	{
		path: '/test',
		name: 'test',
		meta: { title: 'test' },
		component: () => import('/@/views/test.vue')
	},
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
		path: '/*',
		name: '404',
		meta: { title: '404' },
		component: () => import('/@/views/404/')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
