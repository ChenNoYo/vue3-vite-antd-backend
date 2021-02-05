const { Admin, Menu } = require('../model')
const { getPage } = require('./common')
function getMenu (data, parentCode) {
  let codes = data.map(item => item.parentCode)
  console.log('codes: ', codes);
  let parent = []
  codes.forEach((code, i) => {
    console.log(code == parentCode)
    if (code == parentCode) {
      parent.push(data[i])
    }
  })
  parent.forEach(menu => {
    console.log(codes.indexOf(menu.menuCode))
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
      let menu = await Menu.find({}, {}, { lean: true })
      let menuTree = getMenu(menu, '0')
      res.json({
        status: 200,
        response: menuTree
      })
    },
    // 获取菜单列表
    async page (req, res) {
      let { menuCode } = req.query
      let response = await getPage(Menu, { parentCode: menuCode }, { ranking: 1, createTime: 1 }, req)
      res.json({
        status: 200,
        response
      })
    },
    // 新增菜单
    async create (req, res) {
      let form = req.body
      let sameMenuCode = await Menu.find({ menuCode: form.menuCode })
      if (sameMenuCode && sameMenuCode.length) {
        res.json({
          status: 400,
          message: '菜单编号唯一,不可与其他重复'
        })
      } else {
        const newMenu = new Menu(form)
        await newMenu.save()
        res.json({
          status: 200
        })
      }

    },
    // 菜单详情
    async detail (req, res) {
      let response = await Menu.findOne(req.query)
      if (response) {
        res.json({
          status: 200,
          response
        })
      } else {
        res.json({
          status: 400,
          message: '该数据不存在或丢失'
        })
      }
    },
    // 编辑菜单
    async update (req, res) {
      let form = req.body
      await Menu.findOneAndUpdate({
        _id: form._id
      }, {
        menuName: form.menuName,
        ranking: form.ranking,
        modifiedTime: Date.now()
      })
      res.json({
        status: 200
      })
    },
    // 删除菜单
    async del (req, res) {
      let { ids } = req.body
      console.log('ids: ', ids);
      console.log(ids.map((_id) => {
        return { _id }
      }))
      await Menu.remove({
        _id: {
          $in: ids.map((_id) => {
            return { _id }
          })
        }
      })
      res.json({
        status: 200
      })
    },
  }
}

module.exports = SysController
