import 'nprogress/nprogress.css';

import loginApi from '@/api/Login.js';
import Layout from '@/layout/default';
import FrontLayout from '@/layout/front';
import store from '@/store';
import db from '@/utils/localstorage';
import NProgress from 'nprogress';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const constRouter = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: resolve => require(["@/views/redirect/index"], resolve)
      }
    ]
  },
  {
    path: '/screenLogin',
    component: (resolve) => require(['@/views/screenLogin/index'], resolve),
    hidden: true
  },
  {
    path: '/overview',
    component: (resolve) => require(['@/views/overview'], resolve),
    hidden: true
  }, {
    path: '/parkprofile',
    component: (resolve) => require(['@/views/parkprofile'], resolve),
    hidden: true
  },
  {
    path: '/union',
    component: (resolve) => require(['@/views/union'], resolve),
    hidden: true
  },
  {
    path: '/electric',
    component: (resolve) => require(['@/views/electric'],resolve),
    hidden: true
  },
  {
    path: '/orgstructure',
    component: (resolve) => require(['@/views/orgstructure'], resolve),
    hidden: true
  },
  {
    path: '/partyalliance',
    component: (resolve) => require(['@/views/partyalliance'], resolve),
    hidden: true
  },
  {
    path: '/enterprisebrand',
    component: (resolve) => require(['@/views/enterprisebrand'], resolve),
    hidden: true
  },
  {
    path: '/enterprisedetail',
    component: (resolve) => require(['@/views/enterprisedetail'], resolve),
    hidden: true
  },
  {
    path: '/advanced',
    component: (resolve) => require(['@/views/advanced'], resolve),
    hidden: true
  },
  {
    path: "/404",
    component: resolve => require(["@/views/error-page/404"], resolve),
    hidden: true
  },
  {
    path: "/login",
    name: "登录页",
    component: resolve => require(["@/views/login/index"], resolve)
  },
  {
    path: "/",
    redirect: "/login",
    children: [
      {
        path: "/login",
        component: resolve => require(["@/views/login/index"], resolve)
      }
    ]
  },

  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: resolve => require(["@/views/profile/index"], resolve),
        name: "Profile",
        meta: { title: "profile", icon: "user", noCache: true }
      }
    ]
  },

  {
    path: "/profile-front",
    component: FrontLayout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: resolve => require(["@/views/profile-front/index"], resolve),
        name: "ProfileFront",
        meta: { title: "profile", icon: "user", noCache: true }
      }
    ]
  },

  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    meta: {
      title: "errorPages",
      icon: "404"
    },
    children: [
      {
        path: "404",
        component: resolve => require(["@/views/error-page/404"], resolve),
        name: "Page404",
        meta: { title: "page404", noCache: true }
      }
    ]
  },

  {
    path: "/",
    component: FrontLayout,
    redirect: "/front/index",
    children: [
      {
        path: "front/index",
        component: resolve => require(["@/views/front/index"], resolve),
        name: "Front",
        meta: { title: "front", icon: "dashboard", affix: true }
      }
    ]
  },

  {
    path: "/",
    component: Layout,
    redirect: "/backstage/index",
    children: [
      {
        path: "backstage/index",
        component: resolve => require(["@/views/backstage/index"], resolve),
        name: "HPage",
        meta: { title: "HPage", icon: "dashboard", affix: true }
      }
    ]
  }
];

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constRouter
});

const whiteList = ["/login"];

// 异步的路由信息， 同时，左侧菜单也会根据这个来显示
let asyncRouter;

// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  NProgress.start();
  eventBus.$emit('setNetState', true)
  if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    const token = db.get("TOKEN", "");
    const user = db.get("USER");
    const userRouter = db.get("USER_ROUTER", ""); //缓存中的路由
    if (token && token.length && user) {
      if (!asyncRouter) {
        if (!userRouter) {
          loginApi.getRouter({}).then(response => {
            const res = response.data;
            asyncRouter = res.data;
            /*系统内判断 start*/
            // if (!(asyncRouter && asyncRouter.length > 0)) {
            //   asyncRouter = []
            // }
            // asyncRouter.push({
            //   alwaysShow: false,
            //   component: "error-page/404",
            //   hidden: false,
            //   name: "404",
            //   path: "*"
            // });
            /*系统内判断 end*/
            store.commit("account/setRoutes", asyncRouter);

            go(to, next);
          });
        } else {
          asyncRouter = userRouter;
          go(to, next);
        }
      } else {
        next();
      }
    } else {
      if (to.path === "/login") {
        next();
      } else {
        next("/login");
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

function go(to, next) {
  // /*系统内判断 start*/
  let asyncRouterErrorPage = [];
  asyncRouterErrorPage.push({
    alwaysShow: false,
    component: "error-page/404",
    hidden: false,
    name: "404",
    path: "*"
  });

  asyncRouter = filterAsyncRouter(asyncRouter)
  router.addRoutes(asyncRouter)
  router.addRoutes(filterAsyncRouter(asyncRouterErrorPage))

  console.log('asyncRouterErrorPage')
  console.log(asyncRouterErrorPage)
  // /*系统内判断 end*/

  next({ ...to, replace: true });
}

function filterAsyncRouter(routes, parent) {
  return routes && routes.length
    ? routes.filter(route => {
      const component = route.component;
      if (component) {
        if (route.component === "Layout") {
          if (route.children && route.children.length > 0 && parent) {
            route.component = resolve => {
              require(["@/components/RouterWrap/RouterWrap.vue"], resolve);
            };
          } else {
            route.component = Layout;
          }
        }
        // /*前、后台菜单 start*/
        else if (route.component === "FrontLayout") {
          if (route.children && route.children.length > 0 && parent) {
            route.component = resolve => {
              require(["@/components/RouterWrap/RouterWrap.vue"], resolve);
            };
          } else {
            route.component = FrontLayout;
          }
        }
        // /*前、后台菜单 end*/
        else if (typeof component === "string") {
          route.component = view(component);
        }
        if (route.children && route.children.length) {
          route.children = filterAsyncRouter(route.children, route);
        }
        return true;
      }
    })
    : [];
}

function view(path) {
  return function (resolve) {
    require([`@/views/${path}.vue`], resolve);
  };
}

export default router;
