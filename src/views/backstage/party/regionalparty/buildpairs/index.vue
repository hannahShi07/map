<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" :type="type" @handleSwitch="handleSwitch"/>
  </keep-alive>

</template>

<script>
  import Index from './components/index'
  import BuildpairsDetail from './components/buildpairs-detail'

  export default {
    components: {Index,BuildpairsDetail},
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
