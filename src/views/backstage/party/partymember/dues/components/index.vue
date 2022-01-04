<template>
  <div class="dues">
    <el-tabs v-model="currentComponent">
      <el-tab-pane label="党员党费" name="Dues" v-cloak>
      </el-tab-pane>
      <el-tab-pane label="党费审核" name="Examine" v-cloak>
      </el-tab-pane>
    </el-tabs>

    <component :is="currentComponent" @handleSwitch="handleSwitch"/>
  </div>
</template>

<script>
  import Examine from './examine'
  import Dues from './dues'

  export default {
    components: {Examine, Dues},
    data () {
      return {
        currentComponent: 'Dues'
      }
    },
    created () {
      this.currentComponent = 'Dues'
    },
    methods: {
      handleSwitch (params) {
        this.$emit('handleSwitch', {name: 'duesRecord', params})
      }
    }
  }
</script>

