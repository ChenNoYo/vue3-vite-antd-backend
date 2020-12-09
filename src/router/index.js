/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 14:56:59
 * @LastEditTime: 2020-12-09 15:09:25
 */
import { createRouter, createWebHashHistory } from "vue-router";
function load (path) {
  return () => import(`/@/views/${path}/layout.vue`)
}
const routes = [
  {
    path: "/",
    name: "Home",
    component: load('Home')
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
