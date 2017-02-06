<template>
  <div>
    <h3>Products</h3>
    <add-product></add-product>
  <hr>
    <div class="product" v-for="product in products">
        <staff-product
          :product="product"
          track-by="id">
        </staff-product>
    </div>
  </div>
</template>

<script>
import StaffProduct from './StaffProduct.vue'
import AddProduct from './AddProduct.vue'
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    product: Object
  },
  computed: mapState({
    products: state => state.products.all
    }),
  methods: {
    ...mapActions([
      'getProducts'
    ]),
  },
  components: { StaffProduct, AddProduct },
  created () {
    this.getProducts()
  }
}
</script>