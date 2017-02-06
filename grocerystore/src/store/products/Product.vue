<template>
  <div class="card text-xs-center">
    <img class="card-img-top" src="http://placehold.it/253x200" :alt="product.title">
    <div class="card-block">
      <h5 class="card-title">{{product.name}}</h5>
      <p class="card-text">{{product.price | formatMoney}} - Category: {{product.category}} - Stock: {{product.stock }}</p>
      <add-to-cart :product="product"></add-to-cart>
    </div>
  </div>
</template>

<script>
import AddToCart from './AddToCart.vue'
export default {
  props: {
    product: Object
  },
  components: { AddToCart }
}
</script>