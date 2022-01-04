<template>
  <div :class='{"has-logo":showLogo}' style="padding: 0 8px;">
    <el-scrollbar wrap-class='scrollbar-wrapper'>
      <el-menu
        :default-active='activeMenu'
        :collapse='isCollapse'
        :background-color='variables.menuBg'
        :text-color='variables.menuText'
        :unique-opened='true'
        :active-text-color='variables.menuActiveText'
        :collapse-transition='true'
        mode='vertical'
      >
        <sidebar-item
          v-for='route in userRoutes'
          :key='route.path'
          :item='route'
          :base-path='route.path'
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'
  import db from '@/utils/localstorage'

  export default {
    components: {SidebarItem, Logo},

    data () {
      return {
        userRoutes: db.get('USER_ROUTES_CHILD', []),
      }
    },
    watch: {
      $route: {
        handler(to, from) {
          let pathArry = to.path
          // this.isPageHome = pathArry === '/front/index';
          pathArry = pathArry.split("/");
          let cur = pathArry[2]
          if(cur){
            //this.userRoutes = this.$store.state.account.routes[cur];
          }
        },
        immediate: true,
      }
    },
    computed: {
      activeMenu () {
        const route = this.$route
        const {meta, path} = route
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo () {
        return this.$store.state.setting.sidebarLogo
      },
      variables () {
        return variables
      },
      isCollapse () {
        return !this.$store.state.setting.sidebar.opened
      },
      /*userRoutes () {
        // return this.$store.state.account.routes
        return this.$store.state.account.routes.backstage
      }*/
    },

    methods: {
      // 显示一级菜单的子菜单
      showUserRoutes (item) {
        this.userRoutes = item
        db.save('USER_ROUTES_CHILD', item);
      },
    }
  }
</script>
