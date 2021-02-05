const { User, Menu } = require('../model')
module.exports = {
  // 登录
  async login (req, res) {
    const target = req.body
    let user = await User.findOne(target)
    if (user) {
      req.session.user = {
        permission: user.permission,
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
        user: req.session.user
      }
    })
  }
}
