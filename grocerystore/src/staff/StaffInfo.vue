<template>
  <div class="staff-info">
    <h1>Staff</h1>
    <template v-if="staff">
      <h3>Name: {{ staff.name }}</h3>
      <h3>Title: {{ staff.title }}</h3>
      <h3>Salary: {{ staff.salary | formatMoney }}</h3>
      <ul class="meta">
        <li><span class="label">Address: </span> 
          <div class="address" v-for="address in staff.addresses">
            <ul>
              <li>Street Address: {{ address.streetaddress }}, City: {{ address.city }}</li>
            </ul>
            <button type="button" class="btn btn-success"
              @click=showForm>
              Edit Info
            </button>
          <div class="editInfo">
            <static-form v-if="isShowingForm" :data="address" :onSubmit="submitInfo" :onCancel="hideForm"></static-form>
          </div>
          </div>
        </li>
      </ul>
                    <h1>Order</h1>

          <order v-for="order in orders" :order="order">
          </order>
    </template>
  </div>
</template>

<script>
import  { mapActions, mapState } from 'vuex'
import StaticForm from '../form/StaticForm.vue'
import Order from '../order/order.vue'

export default {
  computed: mapState({
    staff: state => state.staff.data,
    orders: state => state.order.all
  }),
  props: {
    staff: Object
  },
  methods: {
    ...mapActions([
      'getStaff',
      'getAllOrders'
    ]),
    showForm() {
      this.isShowingForm = true
    },
    hideForm() {
      this.isShowingForm = false
    },
    submitInfo() {
      console.log('Edit Info!')
    }
  },
  created () {
    this.getAllOrders()
    this.getStaff(this.$route.params.id)
  },
  data() {
    return {
      isShowingForm: false
    }
  },
  components: {
    StaticForm,
    Order
  }
}
</script>

<style lang="stylus">
.staff-info
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
