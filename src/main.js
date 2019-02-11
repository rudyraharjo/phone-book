import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //console.log('meta.requiresAuth') // eslint-disable-line
    if (!store.getters.IsLoggin) {
      next({
        name: 'signin',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.onlyVisitor)) {
    //console.log('meta.onlyVisitor') // eslint-disable-line
    if (store.getters.IsLoggin) {
      next({
        name: 'dashboard',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
