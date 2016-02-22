const domain = require('domain')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const AV = require('leanengine')
const app = express()

const apiRouter = require('./router')
const config = require('./config')

app.use(express.static('web/dist'))

// 使用 LeanEngine 中间件
app.use(AV.Cloud)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())

// 未处理异常捕获 middleware
app.use((req, res, next) => {
  let dm = domain.create()
  dm.add(req)
  dm.add(res)
  dm.on('error', (err) => {
    console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err)
    if (!res.finished) {
      res.statusCode = 500
      res.setHeader('content-type', 'application/json charset=UTF-8')
      res.end('uncaughtException')
    }
  })
  dm.run(next)
})

// 跨域支持
app.all('*', (req, res, next) => {
  const origin = req.headers.origin
  if (~config.whiteOrigins.indexOf(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE')
  }
  next()
})

// api
app.use('/api', apiRouter)

// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(path.dirname(require.main.filename) + '/web/dist/index.html')
})

module.exports = app
