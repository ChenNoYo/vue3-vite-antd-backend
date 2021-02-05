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

// 基础样式
import '/@/assets/css/common.css'
import '/@/assets/css/theme.less'

// antd 组件库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 提示配置
import { message } from 'ant-design-vue';
message.config(
	{
		top: '150px'
	}
)

// 全局样式
import '/@/index.less'

// iconfont

const app = createApp(App)

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
app.use(router).use(store).use(Antd)

// 挂载
router.isReady().then(() => {
	app.mount('#app')
})
