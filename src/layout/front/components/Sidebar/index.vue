<template>
  <div :class='{"has-logo":showLogo}' v-show="!isPageHome">
    <el-scrollbar wrap-class='scrollbar-wrapper'>
      <el-menu
        :default-active='activeMenu'
        :collapse='isCollapse'
        background-color="#fff"
        text-color="#666666"
        :unique-opened='true'
        active-text-color="#ED3C3C"
        :collapse-transition='true'
        mode='vertical'
      >
        <sidebar-item
          v-for='route in userRoute'
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

  export default {
    components: {SidebarItem, Logo},
    data () {
      return {
        userRoute: this.$store.state.account.routes.party,

        // �ж����˵��Ƿ���ʾ
        isPageHome:false
      }
    },
    watch: {
      $route: {
        handler(to, from) {
          let pathArry = to.path
          this.isPageHome = pathArry === '/front/index';
          pathArry = pathArry.split("/");
          let cur = pathArry[2]
          if(cur){
              this.userRoute = this.$store.state.account.routes[cur];
          }

          /*if (cur === 'party') {
            this.isPageHome = false
            this.userRoute = this.$store.state.account.routes.party;
          } else if (cur === 'member') {
            this.isPageHome = false
            this.userRoute = this.$store.state.account.routes.member;
          } else if (cur === 'education') {
            this.isPageHome = false
            this.userRoute = this.$store.state.account.routes.education;
          } else if (cur === 'personnel') {
            this.isPageHome = false
            this.userRoute = this.$store.state.account.routes.personnel;
          } else if (cur === 'corporate') {
            this.isPageHome = false
            this.userRoute = this.$store.state.account.routes.corporate;
          } else if (cur === 'comprehensive') {
            this.isPageHome = false
            this.userRoute = this.$store.state.account.routes.comprehensive;
          }else if(cur === 'index'){
            this.isPageHome = true
          }*/
        },
        immediate: true,
      }
      // $route (to, from) {
      //   let pathArry = to.path
      //   pathArry = pathArry.split("/");
      //   let cur = pathArry[2]
      //   if (cur === 'party') {
      //     this.isPageHome = false
      //     this.userRoute = this.$store.state.account.routes.party;
      //   } else if (cur === 'member') {
      //     this.isPageHome = false
      //     this.userRoute = this.$store.state.account.routes.member;
      //   } else if (cur === 'education') {
      //     this.isPageHome = false
      //     this.userRoute = this.$store.state.account.routes.education;
      //   } else if (cur === 'personnel') {
      //     this.isPageHome = false
      //     this.userRoute = this.$store.state.account.routes.personnel;
      //   } else if (cur === 'corporate') {
      //     this.isPageHome = false
      //     this.userRoute = this.$store.state.account.routes.corporate;
      //   } else if (cur === 'comprehensive') {
      //     this.isPageHome = false
      //     this.userRoute = this.$store.state.account.routes.comprehensive;
      //   }else if(cur === 'index'){
      //     this.isPageHome = true
      //   }
      // }
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
      userRoutes () {
        return this.$store.state.account.routes.user
      }
    }
  }
</script>
