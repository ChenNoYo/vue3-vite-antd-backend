/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 14:56:59
 * @LastEditTime: 2020-12-11 15:59:14
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import api from '../api'
import store from '../store'
function load (path) {
  return () => import(`/@/views/${path}/layout.vue`)
}
const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: load('Login')
  },
  {
    path: '/',
    name: 'Layout',
    component: load('Layout')
  },
  {
    path: '/',
    name: 'Home',
    component: load('Home')
  }
];

let router = createRouter({
  history: createWebHashHistory(),
  routes,
});
let hasGetUser = false
router.beforeEach((to, from, next) => {
  if (to.path === '/Login' || to.path === '/login') {
    next()
  } else {
    if (hasGetUser) {
      next()
    } else {
      api.getUser().then(res => {
        hasGetUser = true
        delete res.response.user.passWord
        store.commit('setUser', res.response.user)
        next()
      })
    }
  }
})
router.afterEach((to) => {
})

export default router
