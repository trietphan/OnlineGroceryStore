<template>
  <div class="addPro">
    <button type="button" class="btn btn-primary"
      @click="showForm">
      Add new product
    </button>
    <static-form v-if="isShowingForm" :data="product" :onSubmit="submitProduct" :onCancel="hideForm">
  </div>
</template>

<script>
import StaticForm from '../../form/StaticForm.vue'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'addProduct',
      
    ]),
    showForm() {
      this.isShowingForm = true
    },
    hideForm() {
      this.isShowingForm = false
    },
    submitProduct() {
      this.addProduct(this.product)
    }
  }, 
  data() {
    return {
      isShowingForm: false,
      product: {
        name: '',
        category: '',
        productsize: '',
        nutrition: '',
        alcoholcontent: '',
        stock: '',
        price: ''

    }
  }
  },
  components: {
    StaticForm
  }, 
}
</script>
