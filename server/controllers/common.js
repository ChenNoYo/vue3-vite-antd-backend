const { User, Config } = require('../model')
async function getConfigs () {
  return new Promise((resolve, reject) => {
    Config.find({}).exec((err, doc) => {
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
async function getConfig (name) {
  return new Promise((resolve, reject) => {
    Config.find({
      name,
    }).exec((err, doc) => {
      if (doc) {
        resolve(doc)
      } else {
        reject(err)
      }
    })
  })
}
// 列表方法
async function getPage (model, query = {}, sort = {}, req) {
  let { pageSize, pageNum } = req.query
  let response = await new Promise((resolve, reject) => {
    pageNum = pageNum ? parseInt(pageNum) : 1
    pageSize = pageSize ? parseInt(pageSize) : 10
    model.find(query)
      .sort(sort)
      .limit(pageSize) //若最后一页剩余文章数不足pageSize个数时，只显示剩余的，不会报错。
      .skip((pageNum - 1) * pageSize)
      .exec((err, page) => {
        if (err) {
          reject(err)
        } else {
          let response = {
            page,
            pageNum,
            pageSize
          }
          resolve(response)
        }
      })
  })
  // 获取数据总数
  if (response.page.length) {
    response.total = await model.count(query)
  } else {
    response.total = 0
  }
  return response
}
module.exports = {
  getConfigs,
  getConfig,
  getPage
}
