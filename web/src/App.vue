<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-11-23 11:32:47
 * @LastEditTime: 2020-12-11 15:52:17
-->
<template>
  <router-view v-slot="{ Component }">
  </router-view>
</template>
<style lang="less">
#app {
  height: 100%;
}
/* 过渡暂没找到写法 */

// .transitionBody {
//   transition: 1s ease; /*定义动画的时间和过渡效果*/
// }
// .slide-fade-enter,
// .slide-fade-leave-to {
//   opacity: 0;
// }
</style>