import {
	onMounted,
	onUnmounted,
	reactive,
	toRefs,
	toRaw,
	watch,
	watchEffect,
	ref,
	getCurrentInstance,
	defineComponent
} from 'vue'
import { useForm } from '@ant-design-vue/use'
import './style.less'

export default defineComponent({
	setup () {
		let {
			$api,
			$message,
			$store,
			$router
		} = getCurrentInstance().appContext.config.globalProperties
		const userRef = reactive({
			userName: window.localStorage.getItem('userName') || '',
			password: ''
		})
		const rulesRef = reactive({
			userName: [
				{
					required: true,
					message: '用户名不能为空'
				}
			],
			password: [
				{
					required: true,
					message: '密码不能为空'
				}
			]
		})
		const { validate, validateInfos } = useForm(userRef, rulesRef)
		const onSubmit = (e) => {
			e.preventDefault()
			validate()
				.then(() => {
					$store.dispatch('user/login', toRaw(userRef)).then(() => {
						window.localStorage.setItem('userName', userRef.userName)
						$router.push({ path: '/main' })
					})
				})
				.catch((err) => {
					console.log('error', err)
				})
		}
		return () => (
			<div class="login-page">
				<h1>后台管理系统登录</h1>
				<a-form model={userRef} label-col={{ span: 4 }} wrapper-col={{ span: 20 }}>
					<a-form-item label="用户名" {...validateInfos.userName}>
						<a-input
							vModel={[userRef.userName, 'value']}
							placeholder="请输入用户名"></a-input>
					</a-form-item>
					<a-form-item label="密码" {...validateInfos.password}>
						<a-input
							type="password"
							vModel={[userRef.password, 'value']}
							placeholder="请输入密码"></a-input>
					</a-form-item>
					<div class="form-btns">
						<a-button onClick={onSubmit} size="large" type="primary">
							登录
						</a-button>
					</div>
				</a-form>
			</div>
		)
	}
})
