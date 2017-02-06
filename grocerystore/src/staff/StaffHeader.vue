<template>
  <div id="staffH">
    <div class="staff-header">
      <div class="staff-inner">
        <router-link to="/">Home</router-link>
        </router-link>
        <span class="info">
            Hello <strong>{{staff.name}}</strong>
        </span>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: mapState({
    staff: state => state.staff.data
  }),
  props: {
    staff: Object
  },
}
</script>

<style lang="stylus">
.staff-header
  background-color #ff6600
  position fixed
  height 55px
  top 0
  left 0
  right 0
  .staff-inner
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