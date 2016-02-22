import Vue from 'vue'
import VueRouter from 'vue-router'
import { hasSignedIn } from './services/auth'

Vue.use(VueRouter)

let router = new VueRouter({
  hashbang: false
})

let emptyComponent = Vue.extend({
  template: ''
})

router.map({
  '/': {
    component: emptyComponent
  },
  '/likes': {
    component: emptyComponent,
    auth: true
  }
})

router.beforeEach(function (transition) {
  if (transition.to.auth) {
    router.app.checkAuth()  // 对用户身份进行验证
    transition.abort()
  }
})

export default router
