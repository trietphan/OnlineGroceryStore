<template>
  <div class="customer-home">
    <customer-header></customer-header>
    <div class="col-sm-7">
      <customer-info></customer-info>
    </div>
    <div class="col-sm-5">
    </div>
    
    <hr>
    <div class="container">
      <div class="row mt-2">
        <div class="col-sm-7">
          <products></products>
        </div>
        <div class="col-sm-5">
          <shopping-cart></shopping-cart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  { mapActions, mapState } from 'vuex'
import CustomerInfo from './../customers/CustomerInfo.vue'
import CustomerHeader from './../customers/CustomerHeader.vue'
import Products from './../store/products/Products.vue'
import ShoppingCart from './../store/cart/ShoppingCart.vue'

export default {
  name: 'customerhome',
  components: {
    CustomerHeader,
    Products,
    CustomerInfo,
    ShoppingCart,
  }
}
</script>