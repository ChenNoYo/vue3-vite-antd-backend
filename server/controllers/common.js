const {
  User,
  Config
} = require('../model')
// 获取页面所有需要显示的用户信息
async function getUsers(ids) {
  return new Promise((resolve, reject) => {
    User.find({
      "$or": ids.map(id => {
        return {
          _id: id
        }
      })
    }, 'avatar nickName').exec((err, userArr) => {
      if (err) {
        reject(err)
      } else {
        let users = {}
        userArr.forEach(item => {
          users[item._id] = item
        })
        resolve(users)
      }
    });
  })
}

async function getConfigs() {
  return new Promise((resolve, reject) => {
    Config.find({})
      .exec((err, doc) => {
        let obj = {}
        if (doc) {
          doc.forEach(item => {
            if (obj[item.name]) {
              obj[item.name].push(item)
            } else {
              obj[item.name] = [item]
            }
          })
        }
        resolve(obj)
      })
  })
}
async function getConfig(name) {
  return new Promise((resolve, reject) => {
    Config.find({
        name
      })
      .exec((err, doc) => {
        if (doc) {
          resolve(doc)
        } else {
          reject(err)
        }
      })
  })
}
module.exports = {
  getUsers,
  getConfigs,
  getConfig
};