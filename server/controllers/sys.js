const { User, Menu, Role, Permission } = require('../model')
const { Page, Create, Detail, Update, Del, getConfig } = require('./common')
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
const SysController = {
  // 菜单
  menu: {
    // 获取菜单树
    async tree (req, res) {
      let menu = await Menu.find({}, {}, { sort: { ranking: 1 }, lean: true })
      let menuTree = getMenu(menu, '0')
      res.json({
        status: 200,
        response: menuTree
      })
    },
    // 获取菜单列表
    async page (req, res) {
      let { parentCode } = req.query
      await Page(Menu, { parentCode }, { ranking: 1, createTime: 1 }, req, res)
    },
    // 新增菜单
    async create (req, res) {
      let form = req.body
      Create(Menu, { menuCode: form.menuCode }, form, res)
    },
    // 菜单详情
    async detail (req, res) {
      Detail(Menu, req, res)
    },
    // 编辑菜单
    async update (req, res) {
      Update(Menu, req, res)
    },
    // 删除菜单
    async del (req, res) {
      Del(Menu, req, res)
    }
  },
  // 角色
  role: {
    // 获取列表
    async page (req, res) {
      Page(Role, {}, { ranking: 1, createTime: 1 }, req, res)
    }
  },
  // 权限
  permission: {
    // 获取列表
    async page (req, res) {
      let configMap = await getConfig()
      const keyWordReg = new RegExp(req.query.keyWord, 'i')
      let response = await Page(Permission, {
        // 模糊搜索
        $or: [
          { permissionName: { $regex: keyWordReg } },
          { permissionCode: { $regex: keyWordReg } },
          { permissionDes: { $regex: keyWordReg } }
        ]
      }, { permissionType: 1, createTime: 1 }, req)
      response.page.forEach(item => {
        item.permissionType = configMap.permissionType[item.permissionType]
      })
      res.json({
        status: 200,
        response
      })
    },
    // 新增
    async create (req, res) {
      let form = req.body
      Create(Permission, { permissionCode: form.permissionCode }, form, res)
    },
    // 详情
    async detail (req, res) {
      Detail(Permission, req, res)
    },
    // 编辑
    async update (req, res) {
      Update(Permission, req, res)
    },
    // 删除
    async del (req, res) {
      Del(Permission, req, res)
    },
  }
}

module.exports = SysController
