<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-11 16:00:12
 * @LastEditTime: 2020-12-11 17:07:04
-->
<template>
  <div class="u-nav"
       :class="{active:active}">
    <div class="logo">后台管理系统</div>
    <a-menu theme="dark"
            mode="inline"
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys">
      <div class="menu-item"
           :key="menu.path"
           v-for="(menu ,i) in menuTree">
        <!-- <a-sub-menu v-if="menu.children.length">
          <template #title>
            <span>{{menu.name}}</span>
          </template>
          <a-menu-item v-for="(item,j) in menu.children"
                       :key="item.path"
                       @click="menuClick(item)">
            <span>{{item.name}}</span>
          </a-menu-item>
        </a-sub-menu> -->
        <a-menu-item
                     @click="menuClick(menu)">
          <span>{{menu.name}}</span>
        </a-menu-item>
      </div>
    </a-menu>
  </div>
</template>

<script>
import {
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  watch,
  watchEffect,
  getCurrentInstance
} from 'vue'
import {
  useRoute,
  useRouter
} from 'vue-router'
export default {
  name: '',
  props: {
    propName: {
      type: String,
      default: ''
    }
  },
  setup () {
    const { api } = getCurrentInstance().appContext.config.globalProperties
    const state = reactive({
      active: true,
      selectedKeys: [],
      expandedKeys: [],
      menuTree: [
        {
          name: '系統設置',
          path: '/sys',
          icon: '',
          children: [
            { name: '菜单设置', path: '/01' },
            { name: '系统角色', path: '/02' },
            { name: '权限设置', path: '/03' }
          ]
        },
        {
          name: '首页',
          path: '/Home',
          icon: '0001',
          children: [
          ]
        }
      ]
    })
    function menuClick (menu) {
      console.log('menu: ', menu);
    }
    return {
      ...toRefs(state),
      menuClick
    }
  }
}
</script>

<style lang="less" scoped>
.u-nav {
  background: rgb(0, 21, 41);
  height: 100%;
  &.active {
    width: 200px;
  }
  width: 100px;
  .logo {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 24px;
  }
  .ant-menu {
    height: calc(100% - 50px);
  }
}
</style>