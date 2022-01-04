<template>
  <component :is="currentComponent" :params="params" @handleSwitch="handleSwitch"></component>
</template>

<script>
  import Index from './components/index'
  import duesRecord from './components/dues-record'

  export default {
    components: {Index,duesRecord},
    watch:{
      $route(to,from){
        if(to){
          this.currentComponent = 'Index'
        }
      }
    },
    data () {
      return {
        currentComponent: 'Index',
        params: {}
      }
    },
    created () {
      this.currentComponent = 'Index'
    },
    methods: {
      handleSwitch ({name, params = {}}) {
        this.currentComponent = name
        this.params = params
      }
    }
  }
</script>
