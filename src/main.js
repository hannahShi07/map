import './icons';
import './styles/element-variables.scss';
import './utils/error-log';
import '@/assets/icon/iconfont/iconfont.css';
import '@/styles/index.scss';
import 'normalize.css/normalize.css';
import 'quill/dist/quill.core.css';
import 'vue2-editor/dist/vue2-editor.css';



import baseComponents from '@/components';
import db from '@/utils/localstorage';
import request from '@/utils/request';
import echarts from 'echarts';
import Element from 'element-ui';
import Vue from 'vue';
import uploader from 'vue-simple-uploader';
import scroll from 'vue-seamless-scroll'

import App from './App';
import * as filters from './filters';
import i18n from './lang';
import router from './router';
import store from './store';
import { hasAnyPermission, hasNoPermission, hasPermission } from './utils/permissionDirect';


// 引入echarts
window.eventBus = new Vue();

Vue.prototype.$echarts = echarts


// 引入vue无缝滚动
Vue.use(scroll)


// 自己的基础组件
Vue.use(baseComponents)

const Plugins = [
  hasPermission,
  hasNoPermission,
  hasAnyPermission
]

Plugins.map((plugin) => {
  Vue.use(plugin)
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(uploader)

Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$put = request.put
Vue.prototype.$delete = request.delete
Vue.prototype.$download = request.download
Vue.prototype.$upload = request.upload
Vue.prototype.$login = request.login


window.eventBus = new Vue();//注册全局事件对象

Vue.prototype.successTip = function getTip() {
  return {
    showClose: true,
    duration: 2000,
    type: 'success',
    message: '操作成功!'
  }
}

Vue.prototype.isEmpty = function getValue(data, keysString) {//数组或对象属性值判空方法
  if (!data) {
    return '--'
  }
  if (!keysString) {
    return data
  }

  // [0],[1]... 属性是数组,只可以一层:obj[0]，不可以多层:obj[0][0]
  let reg = /\[[0-9]+\]/g

  let keys = keysString.split('.')

  for (let key of keys) {
    if (key.match(reg)) {
      // 包含数组
      var ArrKey = key.replace(reg, '')
      var ArrIndex = key.replace(ArrKey, '').replace(/\[/, '').replace(/\]/, '')
      if (data[ArrKey] === undefined || data[ArrKey] === null || data[ArrKey] === '') {
        return '--'
      } else if (data[ArrKey][ArrIndex] === undefined || data[ArrKey][ArrIndex] === null || data[ArrKey][ArrIndex] === '') {
        return '--'
      } else {
        data = data[ArrKey][ArrIndex]
      }
    } else {
      // 对象
      if (data[key] === undefined || data[key] === null || data[key] === '') {
        return '--'
      } else {
        data = data[key]
      }
    }
  }
  return data
}

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false


/**
 * 判断数据是否匹配当前用户本级党组织
 * @Date: 2020/12/10
 * @Param orgCode:党组织编码  进行权限判断
 */
Vue.prototype.curOrgPer = function curOrgPer(orgCode) {
  if (db.get("USER").djOrg && db.get("USER").djOrg.code === orgCode) {
    return false;
  }
  return true;
}

/**
 * 判断数据是否匹配当前用户本级党组织
 * @Date: 2020/12/10
 * @Param orgCode:党组织id 进行权限判断
 */
Vue.prototype.curOrgPerid = function curOrgPer(orgId) {
  if (db.get("USER").djOrg && db.get("USER").djOrg.id === orgId) {
    return false;
  }
  return true;
}


/**
 * 判断数据是否匹配当前用户本级及以下党组织
 * @Date: 2020/12/10
 * @Param orgCode:党组织编码
 */
Vue.prototype.curAndBelowOrgPer = function curAndBelowOrgPer(orgCode) {
  if (orgCode && db.get("USER").djOrg && orgCode.indexOf(db.get("USER").djOrg.code) !== -1) {
    return false;
  }
  return true;
}


/**
 * 判断数据是否为前用户本创建
 * @Date: 2020/12/10
 * @Param createUserId:创建人id
 */
Vue.prototype.creatorPer = function creatorPer(createUserId) {
  if (db.get("USER").id === createUserId) {
    return false;
  }
  return true;
}


new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
