/**
 * 获取当前用户所喜欢的图片
 */

const AV = require('leanengine')

function execute (req, res) {
  res.send(AV.User.current()) // TODO
}

module.exports = execute
