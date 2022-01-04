<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" @handleSwitch="handleSwitch"></component>
  </keep-alive>
</template>

<script>
  import Index from './components/index'
  import InspectionDetail from './components/inspection-detail'

  export default {
    components: {Index,InspectionDetail},
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

