<template>
  <div>
    <h3>Cart</h3>
    <cart-item
      v-for="item in items"
      :item="item"
      :key="item.id">
    </cart-item>
    <cart-summary></cart-summary>
    <div class="mt-1 text-xs-center">
      <button class="btn btn-success"
        :disabled="orderOnLimit"
        @click="buy">
        Checkout
      </button>
      <p v-if="orderOnLimit">Order is over limit.</p>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    items: 'cartProducts',
    orderOnLimit: 'orderOnLimit'
  }),
  components: {
    CartItem,
    CartSummary
  },
  methods: {
    buy () {
      window.alert('You bought :)')
    }
  }
}
</script>