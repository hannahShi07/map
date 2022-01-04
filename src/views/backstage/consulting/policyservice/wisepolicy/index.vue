<template>
  <component :is="currentComponent" :t="t" :tabName="tabName" :params="params" :type="type" :input="input" :tabindex="tabindex" :buttonShow="buttonShow" @handleSwitch="handleSwitch"></component>
</template>

<script>
  import Index from './components/index'
  import wiseDetail from './components/wise-detail'
  import searchResult from './components/search-results'
  import advancedScreening from './components/advanced-screening'
  import relatedDetail from './components/related-detail'

  export default {
    components: {Index,wiseDetail,searchResult,advancedScreening,relatedDetail},
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
        params: {},//数据
        type:'',//1:区外，2:区内
        input:'',//输入框内容
        tabindex:'',//tab切换项
        buttonShow:true,
        t:'',//4:热点解读
        tabName:''//首页推荐政策点击进去对应tab项
      }
    },
    created () {
      this.currentComponent = 'Index'
    },
    methods: {
      handleSwitch ({name,t,tabName,type,input,tabindex,buttonShow,params = {}}) {
        this.currentComponent = name
        this.params = params
        this.type = type
        this.t=t
        this.input=input
        this.tabindex=tabindex
        this.buttonShow=buttonShow
        this.tabName=tabName

      }
    }
  }
</script>
