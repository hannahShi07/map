<template>
  <div class="app-main-wrap">
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <!--<keep-alive>-->
          <router-view :key="key"/>
        <!--</keep-alive>-->
      </transition>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key () {
        return this.$route.path
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-main-wrap {
    padding: 20px 0;//前台头部边距修改
  }

  .app-main {
    /* 68= navbar  68  */
    /*height: calc(100vh - 90px);*/
    width: 100%;
    position: relative;
    /*overflow: auto;*/
    /*background: #fff;*/
    font-size: 14px;
    padding:  0 20px;//前台头部边距修改
    background-color: #EEE;//前台头部颜色修改
    height: auto;
  }

  .fixed-header + .app-main {
    /*height: 100vh;*/
    overflow: hidden;
  }

  .hasTagsView {
    .app-main {
      /* 102 = navbar + tags-view = 68 + 34 */
      /*min-height: calc(100vh - 34px);*/
    }

    .fixed-header + .app-main {
      overflow-x: hidden;
    }
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
