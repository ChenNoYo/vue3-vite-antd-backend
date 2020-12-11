/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 09:09:43
 * @LastEditTime: 2020-12-11 12:00:24
 */
const express = require('express');
const router = express.Router();
const sysController = require('../controllers/sys');
const {
  checkUser
} = require('../uitls/my-parser');
router.post('/login', sysController.login);
router.get('/getUser', checkUser, sysController.getUser);
router.get('/logout', checkUser, sysController.logout);


module.exports = router;