<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" @handleSwitch="handleSwitch"/>
  </keep-alive>

</template>

<script>
  import Index from './components/index'
  import Preview from './components/preview'

  export default {
    components: {Index, Preview},
    watch: {
      $route (to, from) {
        if (to) {
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
