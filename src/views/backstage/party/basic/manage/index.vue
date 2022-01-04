<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" :pageCurrent="pageCurrent" @handleSwitch="handleSwitch"/>
  </keep-alive>
</template>

<script>
  import Index from './components/index'
  import HistoryDetail from '../history/components/history-detail'
  import ManageAdd from './components/manage-add'

  export default {
    components: {Index,HistoryDetail,ManageAdd},
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
        pageCurrent:null
      }
    },
    created () {
      this.currentComponent = 'Index'
    },
    methods: {
      handleSwitch ({name, params = {},pageCurrent}) {
        this.pageCurrent = pageCurrent
        this.currentComponent = name
        this.params = params
      }
    }
  }
</script>
