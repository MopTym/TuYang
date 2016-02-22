/**
 * 授权服务
 */

import AV from 'avoscloud-sdk'

/**
 * 登录
 * @return {Promise}
 */
function signIn (email, password) {
  return AV.User.logIn(email, password)
}

/**
 * 注册
 * @return {Promise}
 */
function signUp (email, password) {
  let user = new AV.User()
  user.set('username', email)
  user.set('password', password)
  user.set('email', email)
  return user.signUp()
}

function hasSignedIn () {
  return !!getCurrentUser()
}

function getCurrentUser () {
  return AV.User.current()
}

export default {
  signIn,
  signUp,
  hasSignedIn,
  getCurrentUser
}
