/**
 * 抓取 RSS
 *
 * 200 - 请求成功
 * 503 - 正忙
 */

const { isBusy, fetch } = require('../service/fetch')

function execute (req, res) {
  let statusCode = 200
  if (isBusy()) {
    statusCode = 503
  } else {
    fetch()
  }
  res.status(statusCode).end()  // 不等待，直接返回状态码
}

module.exports = execute
