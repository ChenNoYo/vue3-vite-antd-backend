import {
	onMounted,
	onUnmounted,
	reactive,
	toRefs,
	watch,
	watchEffect,
	computed,
	getCurrentInstance,
	defineComponent
} from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons-vue'

export default defineComponent(() => {
	let { $api, $message, $store } = getCurrentInstance().appContext.config.globalProperties
	const router = useRouter()
	const route = useRoute()
	const state = reactive({
		title: '后台管理系统',
		collapsed: false,
		openKeys: computed(() => {
			return route.matched.map((item) => {
				return item.name
			})
		}),
		selectedKeys: computed(() => {
			return [route.name]
		}),
		menuTree: computed(() => {
			return $store.getters['user/menuTree']
		})
	})
	const renderMenuItem = (item) => {
		return (
			<a-menu-item
				key={item.menuCode}
				onClick={() => {
					linkTo(item)
				}}>
				<AppstoreOutlined />
				<span>{item.menuName}</span>
			</a-menu-item>
		)
	}
	const renderSubMenu = (subMemu) => {
		const slots = {
			title: () => (
				<span>
					<MenuOutlined />
					<span>{subMemu.menuName}</span>
				</span>
			)
		}
		return (
			<a-sub-menu key={subMemu.menuCode} v-slots={slots}>
				{subMemu.children.map((menuItem) => {
					return renderMenuItem(menuItem)
				})}
			</a-sub-menu>
		)
	}
	const linkTo = (item) => {
		router.push({ path: '/' + item.menuCode })
	}
	const changeCollapse = (e) => {
		state.collapsed = e
	}
	return () => (
		<a-layout-sider
			class="u-nav"
			v-model={state.collapsed}
			collapsible
			onCollapse={changeCollapse}>
			<div class="logo" v-show={!state.collapsed}>
				{state.title}
			</div>
			<a-menu
				theme="dark"
				defaultOpenKeys={state.openKeys}
				selectedKeys={state.selectedKeys}
				mode="inline">
				{state.menuTree.map((item) => {
					if (item.children && item.children.length) {
						return renderSubMenu(item)
					} else {
						return renderMenuItem(item)
					}
				})}
			</a-menu>
		</a-layout-sider>
	)
})
import './style.less'
