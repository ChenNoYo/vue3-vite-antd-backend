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
    cb(null, `${moment().format("YYYYMMDDhhmmss")}-${file.originalname.replace(pattern,"")   }`)
  }
})
var upload = multer({
  storage
});

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
const configController = require('../controllers/config');
router.get('/configs', configController.all);
module.exports = router;