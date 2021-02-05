const createError = require('http-errors')
const express = require('express')
// 异步捕获错误
require('express-async-errors')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const app = express()

const urlencode = require('urlencode')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// 日志打印
const logger = require('./uitls/logger').logger
const httpLogger = require('./uitls/logger').httpLogger
global.logger = logger
//这样会自动记录每次请求信息，放在其他use上面
app.use(httpLogger)

// 参数
var bodyParser = require('body-parser')

// 请求大小限制
app.use(
    bodyParser.json({
        limit: '50mb'
    })
)
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    })
)
app.use(
    express.urlencoded({
        extended: false
    })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// 数据库连接
const mongoose = require('mongoose')
const { dbUrl } = require('./environment')
mongoose.connect(
    dbUrl,
    {
        auto_reconnect: true
    },
    function (error) {}
)

// session
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
app.use(
    session({
        secret: 'this is a string key', // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
        name: 'session_id', // 保存在本地cookie的一个名字 默认connect.sid  可以不设置
        resave: false, // 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
        saveUninitialized: true, // 强制将未初始化的 session 存储。  默认值是true  建议设置成true
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 3 // 过期时间
        },
        /* secure:true  https这样的情况才可以访问cookie */
        rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
        store: new MongoStore({
            url: dbUrl, //数据库的地址
            touchAfter: 24 * 3600 // 通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
        })
    })
)

// 跨域
app.use(cors())
app.use(express.json())

// 静态资源文件夹
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
    // 解决304缓存问题
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.header('Pragma', 'no-cache')
    res.header('Expires', 0)
    next()
})

//资源加载,上传在upload下的所有资源
app.get('/upload/*/*', function (req, res) {
    let path = __dirname + urlencode.decode(req.url, 'UTF-8')
    fs.exists(path, exists => {
        if (exists) {
            res.sendFile(path)
        } else {
            res.send(null)
        }
    })
})

// 路由
const routes = ['sys', 'user', 'common']
routes.forEach(route => {
    app.use(`/${route}`, require(`./routes/${route}`))
})

// 捕获全局错误
app.use((err, req, res, next) => {
    if (err) {
        res.json({
            status: 500,
            message: err.toString()
        })
        logger.warn(err)
    } else {
        next()
    }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
