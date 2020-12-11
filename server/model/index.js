const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId;

// 配置
const configchema = Schema({
  id: ObjectId,
  name: String,
  label: String,
  value: Number
});

// 后台管理
const adminchema = Schema({
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
    type: String
  },
  permission: {
    type: Array
  },
});
// 用戶
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
    type: String
  }
});

const Config = model('Config', configchema);
const Admin = model('Admin', adminchema);
const User = model('User', userchema);

module.exports = {
  Config,
  Admin,
  User
};