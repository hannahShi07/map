<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" :type="type" @handleSwitch="handleSwitch"></component>
  </keep-alive>
</template>

<script>
  import Index from './components/external'
  import DevDetail from './components/dev-detail'

  export default {
    name:"external",
    components: {Index, DevDetail},
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
        type:"dev"
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

