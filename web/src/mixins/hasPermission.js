import store from '../store/index.js'
let permission = store.getters['user/permission']

export default function (permissionCode) {
  return permission.indexOf(permissionCode) !== -1
} 