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
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import { Layout, Row, Col, ConfigProvider, Button, Dropdown, Breadcrumb, Menu, Form, Input, Modal, Radio, Switch, Table, Tree, message } from 'ant-design-vue'
message.config(
	{
		top: '150px'
	}
)
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
	.use(Modal)
	.use(Radio)
	.use(Switch)
	.use(Table)
	.use(Tree)
	.use(message)


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
