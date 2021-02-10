/*
 * @Descripttion:
 * @Author: NoYo
 * @Date: 2020-12-10 09:09:43
 * @LastEditTime: 2020-12-29 14:48:34
 */
const express = require('express')
const router = express.Router()
const sysController = require('../controllers/sys')
const { checkUser } = require('../uitls/my-parser')
// 菜单
/**
 * @api {get} /sys/menu/tree 菜单树
 * @apiGroup 系统维护 - 菜单
 * @apiName 菜单树
 *
 * @apiSuccess {Array} response 树结构
 */
router.get('/menu/tree', checkUser, sysController.menu.tree)

/**
 * @api {get} /sys/menu/page 列表
 * @apiGroup 系统维护 - 菜单
 * @apiName 列表
 *
 * @apiParam {String} pageSize 数量
 * @apiParam {String} pageNum 页码
 * @apiParam {String} parentCode 父级菜单编号/根级0
 * 
 * @apiSuccess {Array} page 列表数据
 * @apiSuccess {Number} total 数据总量
 */
router.get('/menu/page', checkUser, sysController.menu.page)

/**
 * @api {post} /sys/menu/create 新增
 * @apiGroup 系统维护 - 菜单
 * @apiName 新增
 *
 * @apiParam {String} menuName 菜单名称
 * @apiParam {String} menuCode 菜单编号
 * @apiParam {String} permissionCode 权限编号
 * @apiParam {Boolean} show 是否显示
 * @apiParam {Number} ranking 菜单排序
 * @apiParam {String} parentCode 父级菜单编号
 */
router.post('/menu/create', checkUser, sysController.menu.create)
/**
 * @api {post} /sys/menu/update 更新
 * @apiGroup 系统维护 - 菜单
 * @apiName 修改
 *
 * @apiParam {String} menuName 菜单名称
 * @apiParam {String} menuCode 菜单编号
 * @apiParam {String} permissionCode 权限编号
 * @apiParam {Boolean} show 是否显示
 * @apiParam {Number} ranking 菜单排序
 * @apiParam {String} parentCode 父级菜单编号
 */
router.post('/menu/update', checkUser, sysController.menu.update)
/**
 * @api {get} /sys/menu/detail 详情
 * @apiGroup 系统维护 - 菜单
 * @apiName 详情
 *
 * @apiParam {String} _id 数据唯一标识
 */
router.get('/menu/detail', checkUser, sysController.menu.detail)
/**
 * @api {get} /sys/menu/del 删除
 * @apiGroup 系统维护 - 菜单
 * @apiName 删除
 *
 * @apiParam {Array} ids 数据标识合集
 */
router.post('/menu/del', checkUser, sysController.menu.del)
// 角色
/**
 * @api {get} /sys/role/page 列表
 * @apiGroup 系统维护 - 角色
 * @apiName 列表
 *
 * @apiParam {String} pageSize 数量
 * @apiParam {String} pageNum 页码
 * 
 * @apiSuccess {Array} page 列表数据
 * @apiSuccess {Number} total 数据总量
 */
router.get('/role/page', checkUser, sysController.role.page)
/**
 * @api {post} /sys/role/create 新增
 * @apiGroup 系统维护 - 角色
 * @apiName 新增
 *
 * @apiParam {String} roleName 角色名称
 * @apiParam {String} roleCode 角色编号
 * @apiParam {String} roleDes 角色描述
 * @apiParam {Array} permission 角色权限
 */
router.post('/role/create', checkUser, sysController.role.create)
/**
 * @api {post} /sys/role/update 更新
 * @apiGroup 系统维护 - 角色
 * @apiName 更新
 *
 * @apiParam {String} roleName 角色名称
 * @apiParam {String} roleCode 角色编号
 * @apiParam {String} roleDes 角色描述
 * @apiParam {Array} permission 角色权限
 */
router.post('/role/update', checkUser, sysController.role.update)
/**
 * @api {get} /sys/role/detail 详情
 * @apiGroup 系统维护 - 角色
 * @apiName 详情
 *
 * @apiParam {String} _id 数据唯一标识
 */
router.get('/role/detail', checkUser, sysController.role.detail)
/**
 * @api {get} /sys/role/del 删除
 * @apiGroup 系统维护 - 角色
 * @apiName 删除
 *
 * @apiParam {Array} ids 数据标识合集
 */
router.post('/role/del', checkUser, sysController.role.del)
// 权限
/**
 * @api {get} /sys/permission/page 列表
 * @apiGroup 系统维护 - 权限
 * @apiName 列表
 *
 * @apiParam {String} pageSize 数量
 * @apiParam {String} pageNum 页码
 * @apiParam {String} permission 权限类型
 * @apiParam {String} keyword 关键字
 * 
 * @apiSuccess {Array} page 列表数据
 * @apiSuccess {Number} total 数据总量
 */
router.get('/permission/page', checkUser, sysController.permission.page)
/**
 * @api {post} /sys/permission/create 新增
 * @apiGroup 系统维护 - 权限
 * @apiName 新增
 *
 * @apiParam {String} permissionName 权限名称
 * @apiParam {String} permissionCode 权限编号
 * @apiParam {String} permissionType 权限类型
 * @apiParam {String} permissionDes 权限描述
 */
router.post('/permission/create', checkUser, sysController.permission.create)
/**
 * @api {post} /sys/permission/update 更新
 * @apiGroup 系统维护 - 权限
 * @apiName 更新
 *
 * @apiParam {String} permissionName 权限名称
 * @apiParam {String} permissionCode 权限编号
 * @apiParam {String} permissionType 权限类型
 * @apiParam {String} permissionDes 权限描述
 */
router.post('/permission/update', checkUser, sysController.permission.update)
/**
 * @api {get} /sys/permission/detail 详情
 * @apiGroup 系统维护 - 权限
 * @apiName 详情
 *
 * @apiParam {String} _id 数据唯一标识
 */
router.get('/permission/detail', checkUser, sysController.permission.detail)
/**
 * @api {get} /sys/permission/del 删除
 * @apiGroup 系统维护 - 权限
 * @apiName 删除
 *
 * @apiParam {Array} ids 数据标识合集
 */
router.post('/permission/del', checkUser, sysController.permission.del)
// 用户
/**
 * @api {get} /sys/user/page 列表
 * @apiGroup 系统维护 - 用户
 * @apiName 列表
 *
 * @apiParam {String} pageSize 数量
 * @apiParam {String} pageNum 页码
 * @apiParam {String} userStatu 用户状态
 * @apiParam {String} keyword 关键字
 * 
 * @apiSuccess {Array} page 列表数据
 * @apiSuccess {Number} total 数据总量
 */
router.get('/user/page', checkUser, sysController.user.page)
/**
 * @api {post} /sys/user/create 新增
 * @apiGroup 系统维护 - 用户
 * @apiName 新增
 *
 * @apiParam {String} userName 用户账号
 * @apiParam {String} password 用户密码
 * @apiParam {String} role 用户角色
 * @apiParam {String} userStatu 用户状态
 */
router.post('/user/create', checkUser, sysController.user.create)
/**
 * @api {post} /sys/user/update 更新
 * @apiGroup 系统维护 - 用户
 * @apiName 更新
 *
 * @apiParam {String} userName 用户账号
 * @apiParam {String} password 用户密码
 * @apiParam {String} role 用户角色
 * @apiParam {String} userStatu 用户状态
 */
router.post('/user/update', checkUser, sysController.user.update)
/**
 * @api {get} /sys/user/detail 详情
 * @apiGroup 系统维护 - 用户
 * @apiName 详情
 *
 * @apiParam {String} _id 数据唯一标识
 */
router.get('/user/detail', checkUser, sysController.user.detail)
/**
 * @api {get} /sys/user/del 删除
 * @apiGroup 系统维护 - 用户
 * @apiName 删除
 *
 * @apiParam {Array} ids 数据标识合集
 */
router.post('/user/del', checkUser, sysController.user.del)
// 配置
/**
 * @api {get} /sys/config/page 列表
 * @apiGroup 系统维护 - 配置
 * @apiName 列表
 *
 * @apiParam {String} pageSize 数量
 * @apiParam {String} pageNum 页码
 * 
 * @apiSuccess {Array} page 列表数据
 * @apiSuccess {Number} total 数据总量
 */
router.get('/config/page', checkUser, sysController.config.page)
module.exports = router
