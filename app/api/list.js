/**
 * 获取最新的图片
 */

const { getLastList } = require('../service/list')

async function execute (req, res) {
  let list = await getLastList()
  res.send(list)
}

module.exports = execute
