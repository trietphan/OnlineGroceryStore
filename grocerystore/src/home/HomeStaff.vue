<template>
  <div class="customer-home">
    <staff-header></staff-header>
    <staff-info></staff-info>
    <hr>
    <div class="container">
      <div class="row mt-2">
        <div class="col-sm-7">
          <staff-products></staff-products>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  { mapActions, mapState } from 'vuex'
import StaffInfo from './../staff/StaffInfo.vue'
import StaffHeader from './../staff/StaffHeader.vue'
import StaffProducts from './../store/products/StaffProducts.vue'

export default {
  name: 'staffhome',
  components: {
    StaffHeader,
    StaffProducts,
    StaffInfo
  }
}
</script>
