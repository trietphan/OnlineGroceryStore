<template>
  <div class="editPro">
    <static-form v-if="isShowingForm" :data="product" :onSubmit="submitProduct" :onCancel="hideForm">
  </static-form>
  <button type="button" class="btn btn-primary"
    @click="showForm">
    Edit product
  </button>
  </div>
  
</template>

<script>
import { mapActions } from 'vuex'
import StaticForm from '../../form/StaticForm.vue'

export default {
  props: {
    product: Object
  },
  methods: {
    ...mapActions([
      'editProduct'
    ]),
    showForm() {
      this.isShowingForm = true
    },
    hideForm() {
      this.isShowingForm = false
    },
    submitProduct() {
      this.editProduct(this.product)
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