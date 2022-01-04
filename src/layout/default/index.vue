<template>
  <div :class="classObj" class="app-wrapper">
    <navbar @navclick="navclick"/>
    <!--<sidebar class="sidebar-container" ref="sid" v-if="!isHomePage"/>-->
    <sidebar class="sidebar-container" ref="sid" v-show="!isHomePage"/>
    <div :class="{hasTagsView:needTagsView}" class="main-container" v-if="!isHomePage">
      <div :class="{'fixed-header':fixedHeader}">
        <tags-view @tagslick="tagslick" v-if="needTagsView"/>
      </div>
      <app-main/>
    </div>
    <div :class="{hasTagsView:needTagsView}" class="container-home" v-else>
      <div :class="{'fixed-header':fixedHeader}">
      </div>
      <app-main/>
    </div>
  </div>
</template>

<script>
  import {AppMain, Navbar, Sidebar, TagsView} from './components'
  import db from '@/utils/localstorage'

  export default {
    name: 'Layout',
    components: {
      AppMain,
      Navbar,
      Sidebar,
      TagsView
    },
    data(){
      return {
        // 是否首页标识 -> 首页页面距左侧的距离调整为0
        isHomePage:false,
        // 面包屑父级菜单
        breadcrumbParent: db.get('BREADCRUMB_PARENT', {}),
      }
    },
    watch: {
      $route: {
        handler(nv) {
          this.isHomePage = nv.fullPath === '/backstage/index' || nv.fullPath === '/profile/index';
        },
        immediate: true,
      }
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
      },

      // navbar点击事件
      navclick (item) {
        this.$refs.sid.showUserRoutes(item.children);
      },

      // tags点击事件
      tagslick (view) {
        console.log('view')
        console.log(view)

        if(view && view.matched && view.matched.length > 0){
          let obj = view.matched[0];
          if(obj.path){
            this.$refs.sid.showUserRoutes(this.breadcrumbParent[obj.path]);
          }
        }
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
    z-index:  6;
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
</style>
