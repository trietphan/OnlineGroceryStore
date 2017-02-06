<template>
  <div id="home">
    <div class="header">
      <div class="inner">
        <router-link to="/" exact>
          <img class="logo" src="../assets/logo.png" alt="logo">
        </router-link>
      </div>
    </div>
    <div>
      <h3>Customers</h3>
      <div class="customer" v-for="customer in customers">
        <div>
            <router-link :to="'/customer/' + customer.id">
            <strong>{{customer.name}}</strong>
            </router-link>
        </div>
    </div>
    <div>
      <h3>Staff</h3>
      <div class="staff" v-for="staff in allstaff">
        <div>
            <router-link :to="'/staff/' + staff.id">
            <strong>{{staff.name}}</strong>
            </router-link>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: mapState({
    customers: state => state.allCustomers.allcus,
    allstaff: state => state.allStaff.allsf
  }),

  methods: mapActions([
    'getAllCustomers',
    'getAllStaff',
  ]),
  props: {
    customer: Object,
    staff: Object
  },
  created () {
    this.getAllCustomers(),
    this.getAllStaff()
  }
}
</script>

<style lang="stylus">
.header
  background-color #ff6600
  position fixed
  z-index 999
  height 55px
  top 0
  left 0
  right 0
  .inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 5px
  a
    color rgba(255, 255, 255, .8)
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #fff
    &.router-link-active
      color #fff
      font-weight 400
    &:nth-child(6)
      margin-right 0

.logo
  width 24px
  margin-right 10px
  display inline-block
  vertical-align middle
</style>