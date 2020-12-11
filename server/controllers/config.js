/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-10 08:51:34
 * @LastEditTime: 2020-12-11 11:07:53
 */
const {
  Config
} = require('../model');
const {
  getConfigs
} = require('./common');

const ConfigController = {
  async all(req, res) {
    try {
      let response = await getConfigs()
      res.json({
        status: 200,
        response
      })
    } catch (error) {
      logger.warn(error)
      res.json({
        status: 200,
        error
      })
    }
  },
}
module.exports = ConfigController;