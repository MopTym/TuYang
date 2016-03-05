import AV from 'avoscloud-sdk'

const APP_ID = 'JXd3oL0gBYccNSYxO5CInvNn-gzGzoHsz'
const APP_KEY = 'qunjYa8QWMni28jT0fn1dbAm'

function init () {
  AV.initialize(APP_ID, APP_KEY)
  // AV.setProduction(false) // 只用于非生产环境
}

export default { init }
