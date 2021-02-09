const { User, Config } = require('../model')
async function getConfigs () {
  return new Promise((resolve, reject) => {
    Config.find({}, {}, { lean: true }).exec((err, doc) => {
      let obj = {}
      if (doc) {
        doc.forEach(item => {
          // 保证是字符串 
          item.value = item.value + ''
          if (obj[item.propCode]) {
            obj[item.propCode].push(item)
          } else {
            obj[item.propCode] = [item]
          }
        })
      }
      resolve(obj)
    })
  })
}
async function getConfig (propCodes) {
  return new Promise((resolve, reject) => {
    Config.find({
    }).exec((err, doc) => {
      if (doc) {
        console.log('doc: ', doc);
        let configMap = {}
        doc.forEach(item => {
          console.log('item.propCode: ', item.propCode);
          !configMap[item.propCode] && (configMap[item.propCode] = {})
          configMap[item.propCode][item.value] = item.label
        })
        console.log('configMap: ', configMap);
        resolve(configMap)
      } else {
        reject(err)
      }
    })
  })
}
// 列表
async function Page (model, query = {}, sort = {}, req, res = null) {
  let { pageSize, pageNum } = req.query
  req.query.pageSize && delete req.query.pageSize
  req.query.pageNum && delete req.query.pageNum
  req.query.keyWord && delete req.query.keyWord
  query = Object.assign(req.query, query)
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
  if (res) {
    res.json({
      status: 200,
      response
    })
  } else {
    return response
  }
}
// 新增 
async function Create (model, query = {}, form, res = null) {
  let sameCode = await model.find(query)
  if (sameCode && sameCode.length) {
    res.json({
      status: 400,
      message: '编号唯一,不可重复'
    })
  } else {
    const newDoc = new model(form)
    let doc = await newDoc.save()
    if (res) {
      res.json({
        status: 200
      })
    } else {
      return doc
    }
  }
}
// 详情
async function Detail (model, req, res = null) {
  let response = await model.findOne(req.query)
  if (response) {
    res.json({
      status: 200,
      response
    })
  } else {
    res.json({
      status: 400,
      message: '该数据不存在或丢失'
    })
  }
}
// 编辑
async function Update (model, req, res = null) {
  let form = req.body
  let updateForm = Object.assign(form, { modifiedTime: Date.now() })
  let newDoc = await model.findOneAndUpdate({
    _id: form._id
  }, updateForm, {
    new: true
  })
  if (res) {
    res.json({
      status: 200
    })
  } else {
    return newDoc
  }

}
// 删除
async function Del (model, req, res = null) {
  let { ids } = req.body
  await model.remove({
    _id: {
      $in: ids.map((_id) => {
        return { _id }
      })
    }
  })
  if (res) {
    res.json({
      status: 200
    })
  } else {
    return
  }
}
module.exports = {
  getConfigs,
  getConfig,
  Page,
  Create,
  Detail,
  Update,
  Del
}
