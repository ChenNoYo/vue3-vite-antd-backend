const {
  User,
  Config
} = require('../model')
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
  getConfigs,
  getConfig
};