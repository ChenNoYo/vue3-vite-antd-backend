import { useForm } from '@ant-design-vue/use'
import { watchEffect, toRaw } from 'vue'
import { message } from 'ant-design-vue';
export default function (form, rules, state, getDetail = null, confirm = null) {
  const { resetFields, validate, validateInfos } = useForm(form, rules)
  watchEffect(() => {
    if (state.visible && form._id) {
      getDetail && getDetail(form._id)
    }
    if (!state.validate) {
      resetFields()
    }
  })
  function onSubmit (e) {
    e.preventDefault()
    validate()
      .then(() => {
        let formData = toRaw(form)
        if (confirm) {
          message.loading({ content: '提交中', key: 'message' })
          confirm(formData)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return {
    onSubmit,
    validateInfos
  }
} 