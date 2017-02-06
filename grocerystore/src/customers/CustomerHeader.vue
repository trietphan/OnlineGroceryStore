<template>
  <div id="customerH">
    <div class="customer-header">
      <div class="customer-inner">
        <router-link to="/">Home</router-link>
        </router-link>
        <span class="info">
            Hello <strong>{{customer.name}}</strong>
            , your balance is {{customer.balance}}
        </span>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: mapState({
    customer: state => state.customer.data
  }),
  props: {
    customer: Object
  },
}
</script>

<style lang="stylus">
.customer-header
  background-color #ff6600
  position fixed
  height 55px
  top 0
  left 0
  right 0
  .customer-inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 5px
    .info
      text-align center      
      
.logo
  width 24px
  margin-right 10px
  display inline-block
  vertical-align middle
</style>