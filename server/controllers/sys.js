/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 08:51:34
 * @LastEditTime: 2021-02-01 14:35:37
 */
const {
  Admin,
  Menu
} = require('../model');

const SysController = {
  // 登录
  async login (req, res) {
    const target = req.body;
    let user = await Admin.findOne(target)
    if (user) {
      req.session.user = {
        permission: user.permission,
        _id: user._id,
        userName: user.userName,
        role: user.role
      }
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
    res.json({
      status: 200,
      response: {
        user: req.session.user
      }
    })
  },
  // 获取菜单树
  async getMenuTree (req, res) {
    let menu = await Menu.find()
    res.json({
      status: 200,
      response: menu
    })
  }
}

module.exports = SysController