<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 11:32:29
 * @LastEditTime: 2020-12-11 15:40:08
-->
<template>
  <div class="login-page">
    <h1>后台管理系统登录</h1>
    <a-form :model="form"
            ref="aform"
            class="border"
            :labelCol="{span: 4}"
            :wrapperCol="{span: 20}"
            :rules="rules">
      <a-form-item label="账号"
                   name="userName">
        <a-input v-model:value="form.userName"
                 placeholder="请输入用户账号"
                 size="large" />
      </a-form-item>
      <a-form-item label="密码"
                   name="password">
        <a-input v-model:value="form.password"
                 placeholder="请输入用户密码"
                 size="large" />
      </a-form-item>
      <div class="form-btns">
        <a-button type="primary"
                  size="large"
                  @click="onSubmit">
          登录
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<script>
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
  getCurrentInstance
} from 'vue'
import {
  useRoute,
  useRouter
} from 'vue-router'
import uModal from '../../components/u-modal.vue';
export default {
  name: '',
  components: { uModal },
  setup () {
    let { $api, $message, $router, $store } = getCurrentInstance().appContext.config.globalProperties
    const state = reactive({
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
        ],
      },
    })
    let aform = ref(null)
    function onSubmit () {
      aform.value.validate().then(() => {
        $api.sysLogin(state.form).then(res => {
          console.log('res: ', res);
          $store.commit('setUser', res.response)
          $router.push({ path: '/' })
        })
      }).catch((error) => {
      })
    }
    return { ...toRefs(state), onSubmit, aform }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  padding-top: 200px;
  h1 {
    text-align: center;
    margin-bottom: @md;
  }
  .ant-form {
    width: 600px;
    margin: 0 auto;
  }
}
</style>