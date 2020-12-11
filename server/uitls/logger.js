var log4js = require('log4js');
// log4js的输出级别6个: trace, debug, info, warn, error, fatal

log4js.configure({
  // 替换
  replaceConsole: true,
  //输出位置的基本信息设置
  appenders: {
    //设置控制台输出 （默认日志级别是关闭的（即不会输出日志））
    out: {
      type: 'console',
    },
    //设置每天：以日期为单位,数据文件类型，dataFiel   注意设置pattern，alwaysIncludePattern属性
    //http请求日志  http请求日志需要app.use引用一下， 这样才会自动记录每次的请求信息 
    httpLog: {
      type: "dateFile",
      filename: "logs/httpAccess/http",
      pattern: "_yyyy-MM-dd",
      alwaysIncludePattern: true,
      keepFileExt: true
    },
    //错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
    errorLog: {
      type: 'file',
      filename: './logs/error/err',
      alwaysIncludePattern: true,
      keepFileExt: true
    },
    error: {
      type: "logLevelFilter",
      level: "error",
      appender: 'errorLog',
      alwaysIncludePattern: true
    }
  },
  //不同等级的日志追加到不同的输出位置：appenders: ['out', 'allLog']  categories 作为getLogger方法的键名对应
  categories: {
    //appenders:采用的appender,取上面appenders项,level:设置级别
    http: {
      appenders: ['httpLog'],
      level: "debug"
    },
    default: {
      appenders: ['error', 'errorLog', 'httpLog'],
      level: 'debug'
    }, //error写入时是经过筛选后留下的
  }
});
const logger = log4js.getLogger();
const httpLog = log4js.getLogger('http');
const httpLogger = log4js.connectLogger(httpLog, {
  level: 'auto'
});

exports = module.exports = {
  logger,
  httpLogger
};