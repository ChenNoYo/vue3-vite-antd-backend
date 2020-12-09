<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 15:08:53
 * @LastEditTime: 2020-12-09 16:56:47
-->
<template>
  <div class="">
    home
  </div>
</template>

<script>
import {
  onMounted,
  onUnmounted,
  getCurrentInstance,
  reactive,
  toRefs,
  watch,
  watchEffect,
} from 'vue'
import {
  useRoute,
  useRouter
} from 'vue-router'
export default {
  name: '',
  props: {
    propName:{
      type:String,
      default:''
    }
  },
  async setup (props) {
    const { ctx } = getCurrentInstance()
    ctx.$message.info('This is a normal message');
    const state = reactive({ count: 0 })
    ctx.$api.getHomeInfo().then(()=>{})
    return { ...toRefs(state) }
  }
}
</script>

<style lang="less" scoped>
</style>