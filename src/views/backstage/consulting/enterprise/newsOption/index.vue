<template>
  <component :is="currentComponent" :params="params" :type="type" @handleSwitch="handleSwitch"></component>
</template>

<script>
  import Index from './components/index'
  import NewsOptionDetail from './components/newsOption-detail'

  export default {
    components: {Index,NewsOptionDetail},
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
        params: {},
        type:''
      }
    },
    created () {
      this.currentComponent = 'Index'
    },
    methods: {
      handleSwitch ({name, params = {},type}) {
        this.currentComponent = name
        this.params = params
        this.type = type
      }
    }
  }
</script>
