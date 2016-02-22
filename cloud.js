const AV = require('leanengine')
const { fetch } = require('./app/service/fetch')
const { getLastList } = require('./app/service/list')

/**
 * 抓取最新 RSS 数据
 */
AV.Cloud.define('fetch', function (req, res) {
  fetch()
  res.success() // 不等待
})

/**
 * 获取最新列表
 */
 AV.Cloud.define('getLastList', async function (req, res) {
  let list = await getLastList()
   res.success(list)
 })
