<template>
  <div :class="classObj" class="app-wrapper">
    <navbar/>
    <!--    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>-->
    <sidebar class="sidebar-container" v-if="!isHomePage"/>
    <!--<div :class="{hasTagsView:needTagsView}" class="main-container">-->
    <div :class="{hasTagsView:needTagsView}" class="container" v-if="!isHomePage">
      <div :class="{'fixed-header':fixedHeader}">
        <!--<tags-view v-if="needTagsView"/>-->
      </div>
      <app-main/>
    </div>
    <div :class="{hasTagsView:needTagsView}" class="container-home" v-else>
      <div :class="{'fixed-header':fixedHeader}">
        <!--<tags-view v-if="needTagsView"/>-->
      </div>
      <app-main/>
    </div>
  </div>
</template>

<script>
  import {AppMain, Navbar, Sidebar, TagsView} from './components'

  export default {
    name: 'FrontLayout',
    components: {
      AppMain,
      Navbar,
      Sidebar,
      TagsView
    },
    data(){
      return {
        // 首页页面距左侧的距离调整为0
        isHomePage:false
      }
    },
    watch: {
      $route: {
        handler(nv) {
          console.log("nv.fullPath:",nv.fullPath)
          if(nv.fullPath === '/front/index' ||  nv.fullPath === '/profile-front/index'){
            this.isHomePage = true
          }else{
            this.isHomePage = false
          }
          console.log("this.isHomePage:",this.isHomePage)
          /*if(nv.path && nv.path.indexOf('&') !== -1){
             this.$router.push(nv.path.split('&')[1])
          }


          // nv.fullPath === '/front/party' && this.$router.push('/front/party/basic/manage/index')
          if(nv.fullPath === '/front/party'){
            this.$router.push('/front/party/basic/party/index')
          }else if(nv.fullPath === '/front/education'){
            this.$router.push('/front/education/website/index')
          }else if(nv.fullPath === '/front/personnel'){
            this.$router.push('/front/personnel/patronage/document/index')
          }else if(nv.fullPath === '/front/corporate'){
            this.$router.push('/front/corporate/care/information/index')
          }else if(nv.fullPath === '/front/comprehensive'){
            this.$router.push('/front/comprehensive/comprehensive/index')
          }*/
        },
        immediate: true,
      }
      // $route (nv) {
      //   if(nv.fullPath === '/front/index'){
      //     this.isHomePage = true
      //   }else{
      //     this.isHomePage = false
      //   }
      //
      //   // nv.fullPath === '/front/party' && this.$router.push('/front/party/basic/manage/index')
      //   if(nv.fullPath === '/front/party'){
      //     this.$router.push('/front/party/basic/party/index')
      //   }else if(nv.fullPath === '/front/education'){
      //     this.$router.push('/front/education/website/index')
      //   }else if(nv.fullPath === '/front/personnel'){
      //     this.$router.push('/front/personnel/patronage/document/index')
      //   }else if(nv.fullPath === '/front/corporate'){
      //     this.$router.push('/front/corporate/care/information/index')
      //   }else if(nv.fullPath === '/front/comprehensive'){
      //     this.$router.push('/front/comprehensive/integral/index')
      //   }
      // }
    },
    computed: {
      sidebar () {
        return this.$store.state.setting.sidebar
      },
      device () {
        return this.$store.state.setting.device
      },
      showSettings () {
        return this.$store.state.setting.settingBar.opened
      },
      needTagsView () {
        return this.$store.state.setting.multipage
      },
      fixedHeader () {
        return this.$store.state.setting.fixHeader
      },
      classObj () {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside () {
        this.$store.commit('setting/closeSidebar', {withoutAnimation: false})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 68px;
    right: 0;
    z-index:  2000;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .container{
    padding-top: 48px;
    min-height: 100%;
    -webkit-transition: margin-left .28s;
    transition: margin-left .28s;
    margin-left: 200px;
    position: relative;
  }

  .container-home{
    padding-top: 48px;
    min-height: 100%;
    -webkit-transition: margin-left .28s;
    transition: margin-left .28s;
    margin-left: 0px;
  }

  /* .logo-top{
    width: calc(100% + 60px);
    margin-left: -20px;
    padding:14px 20px;
    padding-bottom:0;
    background-color: white;
  } */
</style>
