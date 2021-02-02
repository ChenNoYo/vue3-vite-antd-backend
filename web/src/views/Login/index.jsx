
import {
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  toRaw,
  watch,
  watchEffect,
  ref,
  getCurrentInstance,
  defineComponent
} from 'vue'
import { useForm } from '@ant-design-vue/use';
import './style.less'

export default defineComponent(() => {
  let { $api, $message, $router, $store } = getCurrentInstance().appContext.config.globalProperties
  const userRef = reactive({
    userName: 'admin',
    password: '123456'
  })
  const rulesRef = reactive({
    userName: [
      {
        required: true,
        message: '用户名不能为空'
      }
    ],
    password: [
      {
        required: true,
        message: "密码不能为空"
      }
    ]
  })
  const { validate, validateInfos } = useForm(userRef, rulesRef);
  const onSubmit = (e) => {
    e.preventDefault()
    validate()
      .then(() => {
        $api.sysLogin(toRaw(userRef)).then(res => {
          $store.commit('user/setUser', res.response)
          $router.push({ path: '/' })
        })
      })
      .catch(err => {
        console.log('error', err);
      });
  }
  const userHandle = (key, val) => {
    userRef[key] = val
  }
  return () => (
    <div class="login-page">
      <h1>后台管理系统登录</h1>
      <a-form model={userRef} label-col={{ span: 4 }} wrapper-col={{ span: 20 }}>
        <a-form-item label="用户名" {...validateInfos.userName}>
          <a-input value={userRef.userName} onInput={(e) => { userHandle('userName', e.target.value) }} placeholder="userName"></a-input>
        </a-form-item>
        <a-form-item label="密码" {...validateInfos.password}>
          <a-input type="password" value={userRef.password} onInput={(e) => { userHandle('password', e.target.value) }} placeholder="password"></a-input>
        </a-form-item>
        <div class="form-btns">
          <a-button onClick={onSubmit} size="large" type="primary">登录</a-button>
        </div>
      </a-form>
    </div >
  )
})
