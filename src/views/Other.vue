<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-02 10:42:43
 * @LastEditTime: 2020-12-08 14:21:50
-->
<template>
  <div>
    Other
    <router-link to="/">goBack
    </router-link>
    <u-button :name="buttonName"></u-button>
  </div>
</template>
<script>
import {
  h,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
  reactive,
  toRef,
  toRefs,
  watch,
  watchEffect,
} from 'vue'
import UButton from '../components/u-button.vue'
export default {
  components: { UButton },
  setup () {
    let buttonName = ref('oldName')
    setTimeout(() => {
      buttonName.value = 'newName'
      console.log('buttonName: ', buttonName);
    }, 2000)
    return { buttonName }
  }

}
</script>