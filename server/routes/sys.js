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
module.exports = router
