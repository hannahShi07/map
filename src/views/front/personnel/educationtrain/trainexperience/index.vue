<template>
  <component :is="currentComponent" :params="params" @handleSwitch="handleSwitch"></component>
</template>

<script>
  import Index from './components/index'
  // import RecordsDetail from './components/records-detail'

  export default {
    components: {Index},
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
