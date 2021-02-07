/*
 * @Descripttion:
 * @Author: NoYo
 * @Date: 2020-12-10 08:51:39
 * @LastEditTime: 2020-12-29 14:41:27
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model.bind(mongoose)
const ObjectId = mongoose.Schema.Types.ObjectId

// 配置
const configchema = Schema({
  id: ObjectId,
  name: String,
  label: String,
  value: Number
})

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
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  modifiedTime: {
    type: Date,
    default: Date.now
  }
})
// 菜单
const menuchema = Schema({
  id: ObjectId,
  menuName: {
    // 菜单名称
    type: String,
    required: true
  },
  menuCode: {
    // 菜单编号
    type: String,
    required: true,
    unmodifiable: true
  },
  ranking: {
    // 菜单排序
    type: Number,
    default: 9999
  },
  parentCode: {
    // 父级菜单编号
    type: String
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  modifiedTime: {
    type: Date,
    default: Date.now
  }
})
// 角色
const rolechema = Schema({
  id: ObjectId,
  // 角色名称
  roleName: {
    type: String,
    required: true,
    maxlength: 20
  },
  // 角色编号
  roleCode: {
    type: String,
    required: true,
    maxlength: 20,
    unmodifiable: true
  },
  // 角色权限
  permission: {
    type: Array,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  modifiedTime: {
    type: Date,
    default: Date.now
  }
})
// 权限
const permissionchema = Schema({
  id: ObjectId,
  // 权限名称
  permissionName: {
    type: String,
    required: true,
    maxlength: 20
  },
  // 权限编号
  permissionCode: {
    type: String,
    required: true,
    maxlength: 20,
    unmodifiable: true
  },
  // 权限类型 1 菜单 2 操作
  permissionType: {
    type: String,
    required: true
  },
  // 权限描述
  permissionDes: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  modifiedTime: {
    type: Date,
    default: Date.now
  }
})

const Config = model('Config', configchema)
const User = model('User', userchema)
const Menu = model('Menu', menuchema)
const Role = model('Role', rolechema)
const Permission = model('permission', permissionchema)

module.exports = {
  Config,
  User,
  Menu,
  Role,
  Permission
}
