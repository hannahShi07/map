<!--任免文件-->
<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" @handleSwitch="handleSwitch"/>
  </keep-alive>

</template>

<script>
  import Index from './components/index'
  import PolicyDetail from './components/policy-detail'

  export default {
    components: {Index,PolicyDetail},
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

