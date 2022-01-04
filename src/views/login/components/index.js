import db from "@/utils/localstorage";


/**
 * 菜单处理
 * @Author: dfzhu
 * @Date: 2021/3/17
 */
const menuHandler = {
  /**
   * 获取前台第一个有效菜单path
   * @param routers
   * @returns {*}
   */
  getFrontDefPath(routers) {
    let frontHeader = routers.frontHeader;
    if (frontHeader) {
      // 首页路径(固定值)
      let defPath = '/front/index';
      // 遍历一级菜单
      for (let i = 0; i < frontHeader.length; i++) {
        let router = frontHeader[i];
        let path = router.path;
        if (path === defPath) {
          return path;
          // 登录用户前台第一菜单不是首页时
        } else {
          // 根据有序前台一级菜单获取对应二级菜单
          // 根据‘/’分割path获取第三个路径名作为获取前台二级菜单的key(需前后端保持一致)
          let pathArr = path.split("/");
          if (pathArr && pathArr.length > 2) {
            let key = pathArr[2];
            let menu = routers[key];
            if (menu) {
              // 遍历二级菜单
              for (let j = 0; j < menu.length; j++) {
                let defMenu = menu[j];
                let childMenus = defMenu.children;
                if (childMenus) {
                  // 取三级菜单中排序第一个切有效的菜单path
                  for (let k = 0; k < childMenus.length; k++) {
                    if (childMenus[k].path) {
                      return childMenus[k].path;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  /**
   * 设置前台所有菜单路由重定向地址
   * @param routers
   * @returns {default.computed.frontHeader|et.computed.frontHeader|frontHeader}
   */
  setAllFrontDefPath(routers) {
    let vm = this;
    let frontHeader = routers.frontHeader;
    if (frontHeader && frontHeader.length > 0) {
      // 首页路径(固定值)
      let defPath = '/front/index';
      // 根据有序前台一级菜单获取对应二级菜单
      frontHeader.forEach(router => {
        let path = router.path;
        if (path !== defPath) {
          let pathArr = path.split("/");
          if (pathArr && pathArr.length > 2) {
            let key = pathArr[2];
            if (routers[key]) {
              vm.setFrontDefPath(router, routers[key]);
            }
          }
        } else {
          router.redirect = path;
        }
      })
    }
    return frontHeader;
  },

  /**
   * 设置前台单个菜单路由重定向地址
   * @param router
   * @param menu
   * @returns {boolean}
   */
  setFrontDefPath(router, menu) {
    for (let j = 0; j < menu.length; j++) {
      let defMenu = menu[j];
      let childMenus = defMenu.children;
      if (childMenus) {
        // 默认取三级级菜单中排序第一个且有效页面组件菜单的path作为一级菜单的重定向地址
        for (let k = 0; k < childMenus.length; k++) {
          if (childMenus[k].path) {
            router.redirect = childMenus[k].path;
            return false;
          }
        }
      }
    }
  },

  /**
   * 初始化面包屑父级菜单
   * @Author: dfzhu
   */
  initBreadcrumbParent(routers) {
    if(routers){
      let breadcrumbParent = {};
      routers.forEach(router => {
        if(router.path){
          breadcrumbParent[router.path] = router.children;
        }
      })
      db.save('BREADCRUMB_PARENT', breadcrumbParent);
    }

  },


}

export default menuHandler




