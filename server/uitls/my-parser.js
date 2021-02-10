function checkUser (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.json({
      status: 401,
      message: '用户信息已过期或未登录,请先登录'
    })
  }
}
module.exports = {
  checkUser
}