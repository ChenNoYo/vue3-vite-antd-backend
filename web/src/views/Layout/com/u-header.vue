<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-11 16:00:12
 * @LastEditTime: 2020-12-11 16:07:40
-->
<template>
  <header class="u-header">

  </header>
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
    })
    return { ...toRefs(state) }
  }
}
</script>

<style lang="less" scoped>
.u-header {
  height: 50px;
}
</style>