<template>
  <div class="orderInfo">
    -------- Order -------
   <div v-for="p in products">
     {{p.name}} 
     {{p.quantity}}
  </div>

  </div>
</template>

<script>
export default {
  props: {
    order: Object
  },
  computed: {
    products() {
      return this.order.products.map((p, i) => ({ ...p, quantity: this.order.quantities[i]}))
    },

  }
}
</script>