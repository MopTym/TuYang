/**
 * 抓取 RSS 数据
 */

const http = require('http')
const cheerio = require('cheerio')
const sizeOf = require('image-size')

const Post = require('../dao/Post')

const RSS_URL = 'http://www.lofter.com/tag/%E6%91%84%E5%BD%B1/rss'
const TIMEOUT = 8000
const THUMBNAIL_WIDTH = 400
const TRUTH = 42

let isRunning = false

async function fetch () {
  if (isRunning) return

  console.log('fetching start')
  isRunning = true

  let startDate = await getStartDate()
  console.log('start date:', startDate)

  let items = (await getItems(startDate)).slice(0, TRUTH)
  await saveItems(items)

  isRunning = false
  console.log('fetching end')
}

async function getStartDate () {
  return await Post.getLastDate()
}

async function saveItems (items) {
  for (let i = 0; i < items.length; i++) {
    try {
      await Post.saveFrom(items[i])
      console.log('save:', items[i].date)
    } catch (e) {
      console.log(e)
    }
  }
}

async function getItems (startDate) {
  try {
    let rssXml = await httpGet(RSS_URL)
    let $ = cheerio.load(rssXml, {
      xmlMode: true
    })
    let items = $('item').toArray()
    let finalItems = []
    for (let i = 0; i < items.length; i++) {
      let finalItem = await resolveItem(items[i], $, startDate)
      if (finalItem) {
        finalItems.push(finalItem)
        console.log('fetch:', finalItem.date)
      }
    }
    finalItems.sort((a, b) => b.date - a.date)
    return finalItems
  } catch (e) {
    console.log(e)
    return []
  }
}

async function resolveItem (item, $, startDate) {
  try {
    let $item = $(item)
    let submitter = unescape($item.find('dc\\:creator').text())
    let postUrl = $item.find('guid').text()
    let date = new Date($item.find('pubDate').text())
    let desc = $item.find('description').text()
    let imgs = cheerio.load(desc)('img')
    let imageUrl = imgs.first().attr('src')
    let multiple = imgs.length > 1
    if (imageUrl && date > startDate) {
      let image = await resolveImage(imageUrl)
      let thumbnail = await resolveThumbnail(image)
      return {
        submitter,
        postUrl,
        date,
        image,
        thumbnail,
        multiple
      }
    } else {
      return null
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

/**
 * 解析图片，获取尺寸信息
 */
async function resolveImage (url) {
  let finalUrl = url.replace(/thumbnail.+?\&/i, '')
  let size = sizeOf(await getImageHead(finalUrl))
  return {
    url: finalUrl,
    width: size.width,
    height: size.height
  }
}

/**
 * 解析缩略图
 */
async function resolveThumbnail (image) {
  let finalUrl = image.url + '&thumbnail=' + THUMBNAIL_WIDTH + 'x0'
  let size = sizeOf(await getImageHead(finalUrl))
  return {
    url: finalUrl,
    width: size.width,
    height: size.height
  }
}

/**
 * 获取图片头部数据
 */
function getImageHead (url) {
  return new Promise((resolve, reject) => {
    let chunks = [], len = 0
    let req = http.request(url, (res) => {
      if (res.statusCode === 200) {
        res.on('data', (chunk) => {
          chunks.push(chunk)
          len += chunk.length
          if (len > 81920) {
            req.abort()
            resolve(Buffer.concat(chunks))
          }
        })
        res.on('end', () => resolve(Buffer.concat(chunks)))
      } else {
        reject(new Error('statusCode error'))
      }
    })
    req.setTimeout(TIMEOUT, () => {
      reject(new Error('timeout'))
    })
    req.on('error', reject)
    req.end()
  })
}

/**
 * 将 http.request 转换为 Promise
 */
function httpGet(url) {
  return new Promise((resolve, reject) => {
    let req = http.request(url, (res) => {
      if (res.statusCode === 200) {
        let data = ''
        res.on('data', (chunk) => data += chunk)
        res.on('end', () => resolve(data))
      } else {
        reject(new Error('statusCode error'))
      }
    })
    req.setTimeout(TIMEOUT, () => {
      reject(new Error('timeout'))
    })
    req.on('error', reject)
    req.end()
  })
}

/**
 * 转义字符有一些漏网之鱼
 */
function unescape (str = '') {
  let unescapes = [
    { from: '#39', to: '\'' },
    { from: 'middot', to: '·' }
  ]
  return unescapes.reduce((str, un) => {
    return str.replace(new RegExp('\&' + un.from + '\;', 'ig'), un.to)
  }, str)
}

module.exports = {
  fetch: fetch,
  isBusy: () => isRunning
}
