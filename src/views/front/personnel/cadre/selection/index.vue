<!--干部选任-->
<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" :type="type" @handleSwitch="handleSwitch"/>
  </keep-alive>
</template>

<script>
  import Index from './components/index'
  import SelectionDetail from './components/selection-detail'

  export default {
    components: {Index,SelectionDetail},
    watch:{
      $route(to,from){
        if(to){
          this.currentComponent = 'Index'
        }
      }
    },
      beforeRouteLeave(to,from,next){
          sessionStorage.removeItem('actIndx')
          next()
      },
    data () {
      return {
        currentComponent: 'Index',
        params: {},
        type:{}
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

