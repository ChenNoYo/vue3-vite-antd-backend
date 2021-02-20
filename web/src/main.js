/*
 * @Descripttion:
 * @Author: NoYo
 * @Date: 2020-12-09 14:56:59
 * @LastEditTime: 2021-02-01 11:34:52
 */
import { createApp } from 'vue'
import App from './App.jsx'
import router from './router/index.js'
import store from './store/index.js'

const app = createApp(App)

// 基础样式
import '/@/assets/css/common.css'
import '/@/assets/css/theme.less'

// antd 组件库
// 完整引入
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
// app
// 	.use(Antd)

// 手动按需引入
import { Layout, Row, Col, ConfigProvider, Button, Dropdown, Breadcrumb, Menu, Form, Input, Select, Checkbox, Modal, Radio, Switch, Table, Pagination, Tree, message } from 'ant-design-vue'
message.config(
	{
		top: '150px'
	}
)
app.config.globalProperties.$message = message
app.config.globalProperties.$confirm = Modal.confirm
app
	.use(Layout)
	.use(Row)
	.use(Col)
	.use(ConfigProvider)
	.use(Button)
	.use(Dropdown)
	.use(Breadcrumb)
	.use(Menu)
	.use(Form)
	.use(Input)
	.use(Select)
	.use(Checkbox)
	.use(Modal)
	.use(Radio)
	.use(Switch)
	.use(Table)
	.use(Pagination)
	.use(Tree)
	.use(message)
// 动态特效 可以不引入 但是视觉效果变差
import 'ant-design-vue/lib/style/index.css'

// 全局样式
import '/@/index.less'

// 全局混入
// app.mixin({
// })

// 全局指令
import DirectiveList from './config/directives'
DirectiveList.forEach((item) => app.directive(item.name, item.directive))

import * as utils from './config/utils'
import api from './api'

// 全局注册方法
app.config.globalProperties.$api = api
app.config.globalProperties.$utils = utils

// 权限以及菜单路由
import './permission'

// 功能注册
app.use(router).use(store)

// 挂载
router.isReady().then(() => {
	app.mount('#app')
})
