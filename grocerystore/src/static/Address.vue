<template>
  <div class="CusAddress">
    Street Address: {{ address.streetaddress }}, City: {{ address.city }}
    <static-form v-if="isShowingForm" :data="address" :onSubmit="submitAddress" :onCancel="hideForm">
    </static-form>
    <button type="button" class="btn btn-primary"
      @click="showForm">
      Edit Address
    </button>
  </div>
  
</template>

<script>
import { mapActions } from 'vuex'
import StaticForm from '../form/StaticForm.vue'

export default {
  props: {
    address: Object
  },
  methods: {
    ...mapActions([
      'editAddress'
    ]),
    showForm() {
      this.isShowingForm = true
    },
    hideForm() {
      this.isShowingForm = false
    },
    submitAddress() {
      this.editAddress(this.address)
    }
  }, 
  data() {
    return {
      isShowingForm: false
    }
  },
  components: {
    StaticForm
  }

}
</script>