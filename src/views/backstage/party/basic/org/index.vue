<template>
  <keep-alive>
    <component :is="currentComponent" :type='type' :params="params" :currentOrg="currentOrg" @handleSwitch="handleSwitch"/>
  </keep-alive>
</template>

<script>
  import Index from './components/index'
  import OrgDetail from './components/org-detail'

  export default {
    components: {Index, OrgDetail},
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
        currentOrg:{}
      }
    },
    created () {
      this.currentComponent = 'Index'
    },
    methods: {
      handleSwitch ({name, type,params = {}, currentOrg = {}}) {
        this.currentComponent = name
        this.type=type
        this.params = params
        this.currentOrg = currentOrg
      }
    }
  }
</script>
