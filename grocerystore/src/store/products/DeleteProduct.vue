<template>
  <button type="button" class="btn btn-danger">
    Delete product
  </button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    product: Object
  }
  // methods: mapActions([
  //   'editProduct'
  // ])
}
</script>