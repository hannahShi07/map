<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" :type="type" @handleSwitch="handleSwitch"></component>
  </keep-alive>
</template>

<script>
  import Index from './components/index'
  import PartymassbridgeDetail from './components/partymassbridge-detail'

  export default {
    components: {Index,PartymassbridgeDetail},
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
