/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 08:51:34
 * @LastEditTime: 2020-12-11 11:51:53
 */
const {
  Admin,
  User
} = require('../model');

const SysController = {
  // 登录
  async login (req, res) {
    const target = req.body;
    let user = await Admin.findOne(target)
    if (user) {
      req.session.user = user
      res.json({
        status: 200,
        response: user
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
  getUser (req, res) {
    console.log('req, res: ', req, res);
    res.json({
      status: 200,
      response: {
        user: req.session.user
      }
    })
  }
}

module.exports = SysController