<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 11:38:13
 * @LastEditTime: 2020-12-10 13:47:21
-->
<template>
  <teleport to='body'>
    <div class="u-modal"
         @click="maskClick">
      <div class="modal-box"
           :style="getStyle()">
        <slot></slot>
      </div>
    </div>
  </teleport>
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
export default {
  name: '',
  props: {
    w: {
      type: Number,
      default: 500
    },
    h: {
      type: Number,
      default: 500
    },
    t: {
      type: Number,
      default: 200
    }
  },
  setup (props) {
    const { ctx } = getCurrentInstance()
    const state = reactive({ count: 0 })
    function getStyle () {
      return {
        width: props.w + 'px',
        height: props.h + 'px',
        marginTop: props.t + 'px'
      }
    }
    function maskClick (e) {

    }
    return { ...toRefs(state), getStyle, maskClick }
  }
}
</script>

<style lang="less">
@import "../assets/css/theme.less";
.u-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
}
.modal-box {
  background: #fff;
  .border;
  .shadow;
  padding: 16px;
}
</style>