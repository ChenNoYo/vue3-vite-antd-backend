/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 14:56:59
 * @LastEditTime: 2020-12-10 15:11:37
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from "/@/router/index.js";
import store from "/@/store/index.js";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/css/common.css'
import './assets/css/index.less'
const app = createApp(App)

// 全局混入
// app.mixin({
// })
import * as utils from './config/utils'
import DirectiveList from './config/directives'
DirectiveList.forEach(item => app.directive(item.name, item.directive))
import api from './api'

// 全局注册方法
app.config.globalProperties.$api = api
app.config.globalProperties.$utils = utils

import uModal from './components/u-modal.vue';
app.use(router).use(store).use(Antd)
router.isReady().then(() => {
  app.mount('#app')
})

