<template>
   <div class="form-wrapper">
     <h1>{{title}}</h1>
       <form @submit.prevent>
           <div class="field" v-for="label in labels">
               <label>{{ label }}</label>
               <input v-model="Object.keys(objectToProp).includes(label) ? data[label][objectToProp[label]] : data[label]"/>
           </div>
           <button @click="onSubmit">Submit</button>
           <button @click="onCancel">Cancel</button>
       </form>
   </div>
</template>

<script>
 export default {
   props: {
     title: String, 
     data: Object, 
     onSubmit: Function, 
     onCancel: Function,
     objectToProp: {
       type: Object,
        default: () => ({}),
        required: false,
     }
   },

   computed: {
     labels() {
       const excludedVals = [undefined, null]
       return Object.keys(this.data)
        .filter(key => 
          !excludedVals.includes(this.data[key]) && key !== 'id')
     },
      getValueForLabel(label) {
        console.log(this.objectToProp, label)
        if (Object.keys(this.objectToProp).includes(label)) {
          return this.data[label][this.objectToProp[label]]
        } else {
           return this.data[label]
        }
      }
    },

    // data() {
    //   return {
    //     objectToProp: {}
    //   }
    // }
  }
</script>