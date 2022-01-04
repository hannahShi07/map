<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" :pageCurrent="pageCurrent" @handleSwitch="handleSwitch"></component>
  </keep-alive>
</template>

<script>
  import Index from './components/index'
  import DeclareAdd from './components/declare-add'
  import DeclareDetail from './components/declare-detail'
  import DeclareNonAdd from './components/declare-nonadd'
  import DeclareNonDetail from './components/declare-nondetail'
  import addDeclareproject from '../awards/components/pro-dou-add'

  export default {
    components: {Index,DeclareAdd,DeclareDetail,addDeclareproject,DeclareNonAdd,DeclareNonDetail},
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
        pageCurrent:null
      }
    },
    created () {
      this.currentComponent = 'Index'
    },
    methods: {
      handleSwitch ({name, params = {},pageCurrent}) {
        this.currentComponent = name
        this.params = params
        this.pageCurrent = pageCurrent
      }
    }
  }
</script>
