import AppLayout from '/@/views/layout'

const asyncRoutes = [
	{
		path: '/main',
		name: 'home',
		redirect: '/home',
		component: AppLayout,
		meta: { menu: true, title: '' },
		children: [
			{
				path: '/home',
				name: 'home',
				meta: { menu: true, title: '' },
				component: () => import('/@/views/home')
			}
		]
	},
	{
		path: '/sys',
		name: 'sys',
		redirect: '/menu',
		meta: { menu: true, title: '' },
		component: AppLayout,
		children: [
			{
				path: '/menu',
				name: 'menu',
				meta: { menu: true, title: '' },
				component: () => import('/@/views/sys/menu')
			},
			{
				path: '/role',
				name: 'role',
				meta: { menu: true, title: '' },
				component: () => import('/@/views/sys/role')
			},
			{
				path: '/permission',
				name: 'permission',
				meta: { menu: true, title: '' },
				component: () => import('/@/views/sys/permission')
			},
			{
				path: '/user',
				name: 'user',
				meta: { menu: true, title: '' },
				component: () => import('/@/views/sys/user')
			},
			{
				path: '/config',
				name: 'config',
				meta: { menu: true, title: '' },
				component: () => import('/@/views/sys/config')
			}
		]
	}
]
asyncRoutes.forEach(route => {
	route.children.push(
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			meta: { title: '404' },
			component: () => import('/@/views/404/')
		})
	route.children.push(
		{
			path: '/redirect/:path(.*)*',
			name: 'Redirect',
			component: () => import('/@/views/redirect/'),
			meta: {
				title: 'Redirect',
				hideBreadcrumb: true,
			},
		}
	)
})

export default asyncRoutes
