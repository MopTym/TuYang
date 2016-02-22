/**
 * 所有配置
 */

let config = {

  // 服务端 host
  host: 'http://localhost:3000',

  // web 开发环境的 host
  webHost: 'http://localhost:9000',

  // 跨域白名单
  whiteOrigins: [
    'http://localhost:9000',
    'http://localhost:3000',
    'http://localhost:8080',
    // 以下两个是在 LeanCloud 中配置的 host
    'http://stg-tuyang.leanapp.cn',
    'http://tuyang.leanapp.cn'
  ]
}

// 判断环境
switch (process.env.LC_APP_ENV) {

  // 当前环境为线上测试环境
  case 'stage':
    config.host = 'http://stg-tuyang.leanapp.cn'
    config.webHost = 'http://stg-tuyang.leanapp.cn'
  break

  // 当前环境为线上正式运行的环境
  case 'production':
    config.host = 'http://yuyang.leanapp.cn'
    config.webHost = 'http://tuyang.leanapp.cn'
  break
}

module.exports = config
