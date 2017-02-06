<template>
  <ul class="list-group">
    <li class="list-group-item">
      <strong>Total:</strong>
      ({{itemsQuantity}} {{'item' | pluralize(itemsQuantity) }}): {{totalPrice | formatMoney}}
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'itemsQuantity',
      'total'
    ]),
    // ...mapState([
    //   totalPrice: state => state.shoppingCart.totalPrice

    // ])
    // totalWithDiscount () {
    //   let total = this.$store.getters.total
    //   return total > 0 ? this.total : 0
    // }
  }
}
</script>