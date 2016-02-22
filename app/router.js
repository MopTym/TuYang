/**
 * 所有 API 的路由
 */

const router = require('express').Router()

const list = require('./api/list')
const likes = require('./api/likes')
const fetch = require('./api/fetch')

router.get('/list', list)
router.get('/likes', likes)
router.get('/fetch', fetch)

module.exports = router
