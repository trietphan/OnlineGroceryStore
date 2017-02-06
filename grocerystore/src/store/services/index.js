import Vue from 'vue'
import VueX from 'vuex'

import * as actions from './GetData'
import * as getters from './getters'
import products from './products'
import allCustomers from './allCustomers'
import allStaff from './allStaff'
import customer from './customer'
import staff from './staff'
import shoppingCart from './shopping-cart'
import order from './order'

Vue.use(VueX)

export default new VueX.Store({
  actions,
  getters,
  modules: {
    products,
    allCustomers,
    allStaff,
    customer,
    staff,
    shoppingCart,
    order,
  }
})
