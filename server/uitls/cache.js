const { Role, Menu } = require('../model')
const cache = {}
async function resetCache () {
  let roles = await Role.find()
  let menus = await Menu.find({ show: true }, {}, { sort: { ranking: 1 }, lean: true })
  roles.forEach(role => {
    let permission = role.permission
    let menuPass = []
    // 权限过滤菜单
    menus.forEach(item => {
      if (permission.indexOf(item.permissionCode) !== -1) {
        menuPass.push(item)
      }
    })
    // 生成菜单树
    let menuTree = getMenu(menuPass, '0')
    cache[role.roleCode] = {}
    cache[role.roleCode].permission = permission
    cache[role.roleCode].menuTree = menuTree
    cache[role.roleCode].menuTreeMap = {}
    menuPass.forEach(item => {
      cache[role.roleCode].menuTreeMap[item.menuCode] = item.menuName
    })
  })
}
function getMenu (data, parentCode) {
  let codes = data.map(item => item.parentCode)
  let parent = []
  codes.forEach((code, i) => {
    if (code == parentCode) {
      parent.push(data[i])
    }
  })
  // 获取下级    
  parent.forEach(menu => {
    if (codes.indexOf(menu.menuCode) !== -1) {
      menu.children = getMenu(data, menu.menuCode)
    }
  })
  return parent
}
resetCache()
module.exports = {
  cache,
  resetCache
}