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

import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent(() => {
	const {
		$api,
		$store,
		$confirm,
		$destroyAll,
		$message,
		$router
	} = getCurrentInstance().appContext.config.globalProperties
	const userInfo = $store.getters['user/userInfo']
	function handleChange () { }
	function logout () {
		$confirm({
			okText: '确定',
			cancelText: '取消',
			content: '确定退出账号吗',
			onOk () {
				$store.dispatch('user/logout').then(() => {
					$router.push({ path: '/login' })
				})
			}
		})
	}
	const slots = {
		overlay: () => (
			<a-menu>
				<a-menu-item>
					<span onClick={logout}>退出账号</span>
				</a-menu-item>
				<a-menu-item>
					<span>修改密码</span>
				</a-menu-item>
			</a-menu>
		)
	}
	return () => (
		<header class="u-header">
			<a-dropdown v-slots={slots}>
				<a>
					{userInfo.userName}
					<DownOutlined />
				</a>
			</a-dropdown>
		</header>
	)
})
import './style.less'
