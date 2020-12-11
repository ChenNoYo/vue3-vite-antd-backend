<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-11 15:58:30
 * @LastEditTime: 2020-12-11 16:12:22
-->
<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 15:08:53
 * @LastEditTime: 2020-12-11 15:53:59
-->
<template>
  <div class="layout">
    <u-nav></u-nav>
    <div class="layout-container">
      <u-header></u-header>
      <div class="tag-layout">

      </div>
      <!-- <router-link></router-link> -->
    </div>
  </div>
</template>
<script>
import UHeader from './com/u-header.vue'
import UNav from './com/u-nav.vue'
export default {
  components: { UHeader, UNav }
};
</script>
<style lang="less">
.layout {
  height: 100%;
  display: flex;
  .layout-container {
    flex: 1;
    .tag-container {
      height: calc(100% - 50px);
    }
  }
}
</style>
