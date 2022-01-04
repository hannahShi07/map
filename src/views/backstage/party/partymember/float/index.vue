<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" :type="type" :pageCurrent="pageCurrent" @handleSwitch="handleSwitch"/>
  </keep-alive>
</template>

<script>
  import Index from './components/index'
  // import HistoryDetail from '../history/components/history-detail'
  import FloatAdd from './components/float-add'
  import FloatinDetail from './components/floatin-detail'

  export default {
    components: {Index,FloatinDetail,FloatAdd},
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
