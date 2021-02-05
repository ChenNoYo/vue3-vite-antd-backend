<template>
  <div class="">
    <div ref="myRef">test</div>
  </div>
</template>

<script>
import {
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  ref,
  watch,
  watchEffect,
  getCurrentInstance,
  nextTick
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
    const { $api } = getCurrentInstance().appContext.config.globalProperties
    const state = reactive({ count: 0 })
    const myRef = ref()
    nextTick(() => {
      console.dir(myRef);
    })
    return { ...toRefs(state), myRef }
  }
}
</script>

<style lang="less" scoped>
</style>