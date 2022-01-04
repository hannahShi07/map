<template>
  <keep-alive>
    <component :is="currentComponent" :type='type' :params="params"  @handleSwitch="handleSwitch"/>
  </keep-alive>
</template>

<script>
  import Index from './components/index'

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
        type:'',
        params: {},
      }
    },
    created () {
      this.currentComponent = 'Index'
    },
    methods: {
      handleSwitch ({name, type,params = {}}) {
        this.currentComponent = name
        this.type=type
        this.params = params
      }
    }
  }
</script>

<style scoped>

</style>
