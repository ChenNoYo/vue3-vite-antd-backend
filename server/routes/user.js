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
router.post('/login', userController.login)
router.get('/userInfo', checkUser, userController.userInfo)
router.post('/logout', checkUser, userController.logout)

module.exports = router
