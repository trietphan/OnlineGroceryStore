<template>
  <div class="CusCC">
    <ul>
      <li>Card Number: {{ card.cardnumber }}, </li>
      <li>Expiration: {{ card.expiration }}</li>
      <li>Card Address: {{ card.address.streetaddress }}</li>
      <li>
        <button type="button" class="btn btn-primary"
        @click="showForm">
        Edit Card
        </button>
      </li>
    </ul>
    <static-form v-if="isShowingForm" :data="card" :objectToProp="{address: 'id'}" :onSubmit="submitCard" :onCancel="hideForm">
    </static-form>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import StaticForm from '../form/StaticForm.vue'

export default {
  props: {
    card: Object
  },
  methods: {
    ...mapActions([
      'editCard'
    ]),
    showForm() {
      this.isShowingForm = true
    },
    hideForm() {
      this.isShowingForm = false
    },
    submitCard() {
      this.editCard(this.card)
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