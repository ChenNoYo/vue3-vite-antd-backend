<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 15:08:53
 * @LastEditTime: 2020-12-11 15:53:59
-->
<template>
  <div class="home">
    <a-layout-sider v-model:collapsed="collapsed"
                    :trigger="null"
                    collapsible>
      <div class="logo" />
      <a-menu theme="dark"
              mode="inline"
              v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </div>
</template>
<script>

export default {
  data () {
    return {
    };
  },
};
</script>
<style>
.home {
  height: 100%;
  display: flex;
}
</style>
