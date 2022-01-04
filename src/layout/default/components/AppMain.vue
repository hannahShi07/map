<template>
  <div class="app-main-wrap">
    <section class="app-main" v-if="state">
      <transition name="fade-transform" mode="out-in">
        <!--<keep-alive>-->
          <router-view :key="key"/>
        <!--</keep-alive>-->
      </transition>
    </section>
    <section class="app-main" style="background:#eee; position: relative;" v-else>
      <transition name="fade-transform" mode="out-in">
        <!--<keep-alive>-->
          <Timeout ></Timeout>
        <!--</keep-alive>-->
      </transition>
    </section>
  </div>
</template>

<script>
  import Timeout from './timeout'
  export default {
    name: 'AppMain',
    components:{
      Timeout
    },
    computed: {
      key () {
        return this.$route.path
      }
    },
    data(){
      return{
        state:true
      }
    },
    mounted(){
      var that = this

      eventBus.$on('setNetState',(val)=>{
        // console.log(val)
        if(that.state!=val){
          this.state = val
          // eventBus.$off('setNetState')
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .app-main-wrap {
    padding: 20px;
    min-width: 1366px;
  }

  .app-main {
    /* 68= navbar  68  */
    /*height: calc(100vh - 146px);*/
    width: 100%;
    min-width: 1360px;
    position: relative;
    /*overflow: auto;*/
    background: #fff!important;
    /*background-color: #EEE;*/
    font-size: 14px;
    min-height: calc(100vh - 220px);
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
