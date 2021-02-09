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
router.get('/menu/tree', checkUser, sysController.menu.tree)
router.get('/menu/page', checkUser, sysController.menu.page)
router.post('/menu/create', checkUser, sysController.menu.create)
router.post('/menu/update', checkUser, sysController.menu.update)
router.get('/menu/detail', checkUser, sysController.menu.detail)
router.post('/menu/del', checkUser, sysController.menu.del)
// 角色
router.get('/role/page', checkUser, sysController.role.page)
router.post('/role/create', checkUser, sysController.role.create)
router.post('/role/update', checkUser, sysController.role.update)
router.get('/role/detail', checkUser, sysController.role.detail)
router.post('/role/del', checkUser, sysController.role.del)
// 权限
router.get('/permission/page', checkUser, sysController.permission.page)
router.post('/permission/create', checkUser, sysController.permission.create)
router.post('/permission/update', checkUser, sysController.permission.update)
router.get('/permission/detail', checkUser, sysController.permission.detail)
router.post('/permission/del', checkUser, sysController.permission.del)
// 用户
router.get('/user/page', checkUser, sysController.user.page)
router.post('/user/create', checkUser, sysController.user.create)
router.post('/user/update', checkUser, sysController.user.update)
router.get('/user/detail', checkUser, sysController.user.detail)
router.post('/user/del', checkUser, sysController.user.del)
// 配置
router.get('/config/page', checkUser, sysController.config.page)
module.exports = router
