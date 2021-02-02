/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 09:09:43
 * @LastEditTime: 2020-12-29 14:48:34
 */
const express = require('express');
const router = express.Router();
const sysController = require('../controllers/sys');
const {
  checkUser
} = require('../uitls/my-parser');
// 用户
router.post('/login', sysController.login);
router.get('/getUser', checkUser, sysController.getUser);
router.post('/logout', checkUser, sysController.logout);

// 菜单
router.get('/getMenuTree', checkUser, sysController.getMenuTree);


module.exports = router;