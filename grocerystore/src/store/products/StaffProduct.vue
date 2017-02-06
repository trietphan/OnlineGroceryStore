<template>
  <div class="card text-xs-center">
    <img class="card-img-top" src="http://placehold.it/253x200" :alt="product.title">
    <div class="card-block">
      <h5 class="card-title">{{product.name}}</h5>
      <p class="card-text">{{product.price | formatMoney}} - Category: {{product.category}} - Stock: {{product.stock }}</p>
      <edit-product :product="product"></edit-product>
      <delete-product :product="product"></delete-product>
    </div>
  </div>
</template>

<script>
import EditProduct from './EditProduct.vue'
import DeleteProduct from './DeleteProduct.vue'
export default {
  props: {
    product: Object
  },
  components: { 
    EditProduct,
    DeleteProduct
  }
}
</script>