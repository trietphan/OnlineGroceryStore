<template>
  <div class="media mb-1">
    <div class="media-left">
      <img class="media-object rounded" src="http://placehold.it/50x50" :alt="item.name">
    </div>
    <div class="media-body">
      <strong class="d-block">{{item.name}}</strong>
      <span>Quantity: {{item.quantity}} - {{item.price | formatMoney}}</span>
    </div>
    <div class="media-right align-middle">
      <remove-from-cart :product="item"></remove-from-cart>
    </div>
  </div>
</template>

<script>
import RemoveFromCart from './../products/RemoveFromCart.vue'
export default {
  props: {
    item: Object
  },
  components: { RemoveFromCart }
}
</script>