<template>
  <div>
    <h3>Products</h3>
    <div class="product" v-for="product in products">
        <product
          :product="product"
          track-by="id">
        </product>
    </div>
  </div>
</template>

<script>
import Product from './Product.vue'
import { mapActions, mapState } from 'vuex'

export default {
  computed: mapState({
    products: state => state.products.all
  }),
  methods: mapActions([
    'getProducts',
  ]),
  components: { Product },
  created () {
    this.getProducts()
  }
}
</script>