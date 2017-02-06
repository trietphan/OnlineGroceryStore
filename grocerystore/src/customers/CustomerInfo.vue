<template>
  <div class="customer-info">
    <h1>Customer</h1>
    <template v-if="customer">
      <h3>Name: {{ customer.name }}</h3>
      <ul class="meta">
        <h4>Address: </h4>
        <div class="address" v-for="address in customer.addresses">
          <display-address 
            :address="address"
            track-by="id">
          </display-address>
        </div>
        <h4>Credit card:</h4>
        <div class="card" v-for="card in customer.creditcards">
          <display-card 
            :card="card"
            track-by="id">
          </display-card>
        </div>
        <li><span class="label">Balance:</span> {{ customer.balance | formatMoney }}</li>
        <h1>Order</h1>
        <order v-for="order in customer.orders" :order="order"></order>
    </template>
  </div>
</template>

<script>
import  { mapActions, mapState } from 'vuex'
import StaticForm from '../form/StaticForm.vue'
import Order from '../order/order.vue'
import DisplayAddress from '../static/Address.vue'
import DisplayCard from '../static/CreditCard.vue'

export default {
  computed: {
    ...mapState({
      customer: state => state.customer.data
    }),
  },
  props: {
    customer: Object,
  },
  methods: {
    ...mapActions([
      'getCustomer',
      'editAddress'
    ]),
    showForm() {
      this.isShowingForm = true
    },
    hideForm() {
      this.isShowingForm = false
    },
  },
  created () {
    this.getCustomer(this.$route.params.id)
  },
  data() {
    return {
      isShowingForm: false
    }
  },
  components: {
    StaticForm,
    Order,
    DisplayAddress,
    DisplayCard
  }
}
</script>

<style lang="stylus">
.customer-info
  box-sizing border-box
  padding 2em 3em
  h3
    margin 0
    font-size 1.5em
  .meta
    list-style-type none
    padding 0
    li
      width 100%
      margin-left 1.2em

  .label
    display inline-block
    min-width 4em
    color black
    font-size 1.2em
  .about
    margin 1em 0
  .links a
    text-decoration underline
</style>