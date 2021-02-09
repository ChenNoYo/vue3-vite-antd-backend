const express = require('express');
var moment = require("moment");
var path = require('path');
const router = express.Router();
const pattern = /[`~!@#$^&*()=|{}':;'_%,\\\[\]\<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;

// 文件上传
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../', req.url));
  },
  filename: function (req, file, cb) {
    cb(null, `${moment().format("YYYYMMDDhhmmss")}-${file.originalname.replace(pattern, "")}`)
  }
})
var upload = multer({
  storage
});
/**
 * @api {post} /common/upload/:file 上传文件
 * @apiGroup 通用
 * @apiName 上传文件
 *
 * @apiParam {String} file 文件上传类型(保存路径)
 *
 * @apiSuccess {String} fileUrl 文件保存路径
 */
// 文件上传
router.post('/upload/*', upload.single('file'), function (req, res, next) {
  var file = req.file
  let r = {
    code: file ? 200 : 500,
    fileUrl: file ? req.url + '/' + file.filename : null
  }
  res.json(r)
})


// 获取config
const configController = require('../controllers/config')
/**
 * @api {get} /common/configs 系统配置
 * @apiGroup 通用
 * @apiName 系统配置
 */
router.get('/configs', configController.all)
module.exports = router;