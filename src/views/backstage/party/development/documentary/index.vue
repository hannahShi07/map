<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" :type="type" :pageCurrent="pageCurrent" @handleSwitch="handleSwitch"/>
  </keep-alive>

</template>
<script>
  import Index from './components/index'
  import HistoryDetail from '../../basic/history/components/history-detail'
  import DocumentaryAdd from './components/documentary-add'
  import JoinParty from './components/join-party'
  import Process from './components/process'


  export default {
    name: "index",
    components: {Index,DocumentaryAdd,JoinParty,HistoryDetail,Process},
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
        type:'',
        pageCurrent:null
      }
    },
    created () {
      this.currentComponent = 'Index'
    },
    methods: {
      handleSwitch ({name, params = {},type,pageCurrent}) {
        this.pageCurrent = pageCurrent
        this.currentComponent = name
        this.params = params
        this.type = type
      }
    }
  }
</script>

<style scoped>

</style>
