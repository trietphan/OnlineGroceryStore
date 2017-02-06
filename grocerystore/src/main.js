import Vue from 'vue'
import VueRouter from 'vue-router'
import accounting from 'accounting'
import pluralize from 'pluralize'

import App from './App.vue'
import Home from './home/Home.vue'
import HomeStaff from './home/HomeStaff.vue'
import HomeCustomer from './home/HomeCustomer.vue'
import store from './store/services'

const routes = [
  {path: '/', component: Home},
  {path: '/staff/:id(\\d+)', component: HomeStaff},
  {path: '/customer/:id(\\d+)', component: HomeCustomer},
]

Vue.use(VueRouter)
Vue.filter('formatMoney', accounting.formatMoney)
Vue.filter('pluralize', pluralize)

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
