<!--人才政策-->
<template>
  <component :is="currentComponent" :params="params" :type="type" @handleSwitch="handleSwitch"></component>
</template>

<script>
  import Index from './components/index'
  import AppraisalDetail from './components/appraisal-detail'

  export default {
    components: {Index,AppraisalDetail},
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
