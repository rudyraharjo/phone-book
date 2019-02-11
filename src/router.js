import Vue from 'vue'
import Router from 'vue-router'
import Signin from './views/auth/Signin'
import Signup from './views/auth/Signup'
import Dashboard from './views/master/Dashboard'
import Contact from './views/master/Contact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: {
        onlyVisitor: true,
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        onlyVisitor: true,
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        requiresAuth: true,
      }
    }
  ]
})
