/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 08:51:39
 * @LastEditTime: 2020-12-29 14:41:27
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId;

// 配置
const configchema = Schema({
  id: ObjectId,
  name: String,
  label: String,
  value: Number
});

// 后台管理
const adminchema = Schema({
  id: ObjectId,
  userName: {
    type: String,
    required: true,
    maxlength: 20
  },
  passWord: {
    type: String,
    required: true,
    maxlength: 50
  },
  role: {
    type: String
  },
  permission: {
    type: Array
  },
});
// 用戶
const userchema = Schema({
  id: ObjectId,
  userName: {
    type: String,
    required: true,
    maxlength: 20
  },
  passWord: {
    type: String,
    required: true,
    maxlength: 50
  },
  role: {
    type: String
  }
});
// 菜单
const menuchema = Schema({
  id: ObjectId,
  menuName: { // 菜单名称
    type: String,
    required: true,
  },
  code: { // 菜单编号
    type: String,
    required: true,
  },
  path: { // 菜单跳转路径
    type: String,
    required: true,
  },
  icon: { // 菜单显示图标
    type: String,
  },
  children: { // 菜单子项
    type: Array
  },
  parentCode: { // 父级菜单编号
    type: String,
  }
});
// 权限

const Config = model('Config', configchema);
const Admin = model('Admin', adminchema);
const User = model('User', userchema);
const Menu = model('Menu', menuchema);

module.exports = {
  Config,
  Admin,
  User,
  Menu
};