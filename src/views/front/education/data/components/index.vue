<template>
  <div style="height: 100%;" :style="{background: currentComponent === 'OtherTab' ? '#FFFFFF' : '#EFEFEF'}">
    <div class="tabs">
      <div class="tab" :class="{'active': currentComponent === 'VoiceTab'}" @click="currentComponent = 'VoiceTab'">
        音频视频
      </div>
      <div class="tab" :class="{'active': currentComponent === 'BookTab'}" @click="currentComponent = 'BookTab'">
        书籍材料
      </div>
      <div class="tab" :class="{'active': currentComponent === 'OtherTab'}" @click="currentComponent = 'OtherTab'">
        其他材料
      </div>
    </div>

    <transition name="fade-transform" mode="out-in">
      <component :is="currentComponent" @handleSwitch="handleSwitch"/>
    </transition>
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

<style lang="scss" scoped>
  .tabs {
    position: relative;
    left: -20px;
    width: calc(100% + 40px);
    text-align: center;
    background: #fff;
    padding-top: 15px;
  }

  .tab {
    display: inline-block;
    padding: 19px 0;
    margin-right: 40px;
    font-size: 20px;
    color: #666666;
    cursor: pointer;

    &.active {
      color: #ED3C3C;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        background: #ED3C3C;
        height: 2px;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
</style>
