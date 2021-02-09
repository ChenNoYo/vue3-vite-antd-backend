const { User, Menu } = require('../model')
const { cache } = require('../uitls/cache')
module.exports = {
  // 登录
  async login (req, res) {
    const target = req.body
    let user = await User.findOne(target)
    if (user) {
      if (user.userStatu === '2') { // 激活
        req.session.user = {
          _id: user._id,
          userName: user.userName,
          role: user.role
        }
        res.json({
          status: 200
        })
      } else {
        res.json({
          status: 400,
          message: '该账号暂未激活,请联系管理人'
        })
      }
    } else {
      res.json({
        status: 400,
        message: '账号或密码错误,请重新输入'
      })
    }
  },
  // 退出
  logout (req, res) {
    req.session.destroy()
    res.json({
      status: 200
    })
  },
  // 获取当前用户信息
  userInfo (req, res) {
    res.json({
      status: 200,
      response: {
        user: req.session.user,
        permission: cache[req.session.user.role].permission,
        menuTree: cache[req.session.user.role].menuTree,
        menuTreeMap: cache[req.session.user.role].menuTreeMap
      }
    })
  }
}
