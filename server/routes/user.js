/*
 * @Descripttion:
 * @Author: NoYo
 * @Date: 2020-12-10 09:09:43
 * @LastEditTime: 2020-12-29 14:48:34
 */
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const { checkUser } = require('../uitls/my-parser')

// 用户
/**
 * @api {post} /user/login 登录
 * @apiGroup 用户
 * @apiName 登录
 *
 * @apiParam {String} userName 用户账号
 * @apiParam {String} password 用户密码
 */
router.post('/login', userController.login)

/**
 * @api {get} /user/userInfo 用户信息
 * @apiGroup 用户
 * @apiName 用户信息
 *
 * @apiSuccess {Object} user 用户信息
 * @apiSuccess {Array} permission 用户权限
 * @apiSuccess {Array} menuTree 菜单树
 * @apiSuccess {Object} menuTreeMap 菜单对应路由中文名称
 */
router.get('/userInfo', checkUser, userController.userInfo)

/**
 * @api {post} /user/logout 账号退出
 * @apiGroup 用户
 * @apiName 账号退出
 */
router.post('/logout', checkUser, userController.logout)

/**
 * @api {post} /user/updatePassword 修改密码
 * @apiGroup 用户
 * @apiName 修改密码
 * 
 * @apiParam {String} oldP 旧密码
 * @apiParam {String} newP 新密码
 */
router.post('/updatePassword', checkUser, userController.updatePassword)

module.exports = router
