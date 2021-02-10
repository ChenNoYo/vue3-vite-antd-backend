const { User, Menu, Role, Permission, Config } = require('../model')
const { Page, Create, Detail, Update, Del, getConfig } = require('./common')
const { resetCache, cache } = require('../uitls/cache')
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
      // 生成菜单树
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
      await Create(Menu, { menuCode: form.menuCode }, form, res)
      resetCache()
    },
    // 菜单详情
    async detail (req, res) {
      Detail(Menu, req, res)
    },
    // 编辑菜单
    async update (req, res) {
      await Update(Menu, req, res)
      resetCache()
    },
    // 删除菜单
    async del (req, res) {
      await Del(Menu, req, res)
      resetCache()
    }
  },
  // 角色
  role: {
    // 获取列表
    async page (req, res) {
      Page(Role, {}, { createTime: 1 }, req, res)
    },
    // 新增角色
    async create (req, res) {
      let form = req.body
      await Create(Role, { roleCode: form.roleCode }, form, res)
      resetCache()
    },
    // 角色详情
    async detail (req, res) {
      Detail(Role, req, res)
    },
    // 编辑角色
    async update (req, res) {
      await Update(Role, req, res)
      resetCache()
    },
    // 删除角色
    async del (req, res) {
      await Del(Role, req, res)
      resetCache()
    }
  },
  // 权限
  permission: {
    // 获取列表
    async page (req, res) {
      let configMap = await getConfig()
      const keywordReg = new RegExp(req.query.keyword, 'i')
      console.log('req.query.keyword: ', req.query.keyword);
      let response = await Page(Permission, {
        // 模糊搜索
        $or: [
          { permissionName: { $regex: keywordReg } },
          { permissionCode: { $regex: keywordReg } },
          { permissionDes: { $regex: keywordReg } }
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
  },
  // 用户
  user: {
    // 获取列表
    async page (req, res) {
      let configMap = await getConfig()
      const keywordReg = new RegExp(req.query.keyword, 'i')
      let response = await Page(User, {
        // 模糊搜索
        $or: [
          { userName: { $regex: keywordReg } },
        ]
      }, { createTime: 1 }, req)
      response.page.forEach(item => {
        item.userStatu = configMap.userStatu[item.userStatu]
      })
      res.json({
        status: 200,
        response
      })
    },
    // 新增
    async create (req, res) {
      const form = req.body
      let user = await User.findOne({
        userName: form.userName
      })
      if (user) {
        res.json({
          status: 400,
          message: '用户账号已存在'
        })
      } else {
        const newUser = new User(form)
        user = await newUser.save()
        res.json({
          status: 200
        })
      }
    },
    // 详情
    async detail (req, res) {
      Detail(User, req, res)
    },
    // 编辑
    async update (req, res) {
      const form = req.body
      let user = await User.findOne({
        userName: form.userName, // 同样账号
        _id: { $ne: form._id } // 且不是该条数据
      })
      if (user) {
        res.json({
          status: 400,
          message: '用户账号已存在'
        })
      } else {
        await User.findOneAndUpdate({
          _id: form._id
        }, form)
        res.json({
          status: 200
        })
      }
    },
    // 删除
    async del (req, res) {
      Del(User, req, res)
    }
  },
  // 配置
  config: {
    // 获取列表
    async page (req, res) {
      let response = await Page(Config, {
      }, { name: 1 }, req)
      res.json({
        status: 200,
        response
      })
    },
  }
}

module.exports = SysController
