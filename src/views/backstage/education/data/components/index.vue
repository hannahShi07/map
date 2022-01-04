<template>
  <div style="height: calc(100vh - 143px);min-height: 856px;"
       :style="{background: currentComponent === 'OtherTab' ? '#FFFFFF' : '#EFEFEF'}">
    <el-tabs v-model="currentComponent">
      <el-tab-pane label="音频视频" name="VoiceTab" v-cloak>
      </el-tab-pane>
      <el-tab-pane label="书籍材料" name="BookTab" v-cloak>
      </el-tab-pane>
      <el-tab-pane label="其他材料" name="OtherTab" v-cloak>
      </el-tab-pane>
    </el-tabs>

    <component :is="currentComponent" @handleSwitch="handleSwitch"/>
  </div>
</template>

<script>
  import BookTab from './book-tab'
  import VoiceTab from './voice-tab'
  import OtherTab from './other-tab'

  export default {
    components: {BookTab, VoiceTab, OtherTab},
    data () {
      return {
        currentComponent: 'VoiceTab'
      }
    },
    created () {
      this.currentComponent = 'VoiceTab'
    },
    methods: {
      handleSwitch (params) {
        this.$emit('handleSwitch', {name: 'Preview', params})
      }
    }
  }
</script>
