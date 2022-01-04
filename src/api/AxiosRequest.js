import db from '@/utils/localstorage';
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { Base64 } from 'js-base64';
import store from '@/store/index'
import loginApi from '@/api/Login.js'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
  responseType: 'json',
  validateStatus(status) {
    return status === 200
  }
})


// 是否在刷新token
window.isRefreshing = false;

// 被挂起的请求数组
let refreshSubscribers = [];

// 添加挂起的请求到数组中
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

// 刷新被挂起的请求
function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
}


// 请求添加条件，如token
service.interceptors.request.use(config => {
    if(isTokenExpired()){
      if (!window.isRefreshing) {
        // 将刷新token的标志置为true
        window.isRefreshing = true;
        let param = {
          tenant: db.get('TENANT'),
          grantType: "refresh_token",
          refreshToken: db.get('REFRESH_TOKEN')
        }
        loginApi.login(param).then(response => {
          window.isRefreshing = false;
          const res = response.data;
          if (res.isSuccess) {
            saveLoginData(res.data.token, res.data.refreshToken, res.data.expiration);
            // 重新发起被挂起的请求
            onRrefreshed(res.data.token);
            // 清空数组中保存的请求
            refreshSubscribers = [];
          }
        }).catch(error => {
          window.isRefreshing = false;
          if (error.response.data.msg) {
            Message({
              message: error.response.data.msg
            })
          } else if (error.response.data.message) {
            Message({
              message: error.response.data.message
            })
          }
        })
      }

      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(token => {
          const clientId = process.env.VUE_APP_CLIENT_ID;
          const clientSecret = process.env.VUE_APP_CLIENT_SECRET;
          config.headers['Authorization'] = `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`;
          config.headers.token = 'Bearer ' + token;
          config.headers.tenant = db.get('TENANT', '')
          // 请求挂起
          resolve(config);
        });
      });
    }else {
      const isToken = config.headers['X-isToken'] === false ? config.headers['X-isToken'] : true;

      const token = db.get('TOKEN', '')
      if (token && isToken) {
        config.headers.token = 'Bearer ' + token
      }
      eventBus.$emit('setNetState', true)
      //需要执行的代码

      config.headers.tenant = db.get('TENANT', '')
      const clientId = process.env.VUE_APP_CLIENT_ID;
      const clientSecret = process.env.VUE_APP_CLIENT_SECRET;
      config.headers['Authorization'] = `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`;
    }

    return config
},
  error => {
    return Promise.reject(error)
  }
)

// 接口返回处理
service.interceptors.response.use(
  response => {
    if (response.data.code == 0) {
      let index = response.data.msg.indexOf('http')
      if(index != -1){
        return response.data.msg
      }else{
        return response.data.data
      }
    } else {
      return response
    }

  },
  error => {
    return Promise.reject(error)
  }
)

function handleError(error, reject, opts) {
  let isAlert = opts.custom ? opts.custom['isAlert'] : true;
  isAlert = isAlert === undefined ? true : isAlert;
  if (isAlert) {
    if (error.code === 'ECONNABORTED') {
      Message({
        message: '请求超时'
      })
    } else if (error.response && error.response.data) {
      if (error.response.data.msg) {
        Message({
          message: error.response.data.msg
        })
      } else if (error.response.data.message) {
        Message({
          message: error.response.data.message
        })
      }
    } else if (error.message) {
      Message({
        message: error.message
      })
    }
  }
  reject(error)
}

function handleSuccess(res, resolve, opts) {
  let isAlert = opts.custom ? opts.custom['isAlert'] : true;
  isAlert = isAlert === undefined ? true : isAlert;
  if (res != undefined && res.data != undefined && res.data.isError) {
    // 未登录
    if (res.data.code === 40000 || res.data.code === 40001
      || res.data.code === 40002 || res.data.code === 40003
      || res.data.code === 40005 || res.data.code === 40006
      || res.data.code === 40008
    ) {
      MessageBox.alert(res.data.msg, '提醒', {
        confirmButtonText: '确定',
        callback: () => {
          window.location.hash = '/login'
        }
      })
    } else {
      if (res.data.code == -2) {
        eventBus.$emit('setNetState', false)
      }
      if (isAlert) {
        Message.error(res.data.msg);
      }
    }
  }
  resolve(res)
}

// http请求
const httpServer = (opts) => {
  // 公共参数
  const publicParams = {
    ts: Date.now()
  }

  // http默认配置
  const method = opts.method.toUpperCase()
  // baseURL
  // 开发环境： /api                 // 开发环境在 vue.config.js 中有 devServer.proxy 代理
  // 生产环境： http://IP:PORT/api   // 生产环境中 代理失效， 故需要配置绝对路径
  const httpDefaultOpts = {
    method,
    baseURL: process.env.VUE_APP_PROD_REQUEST_DOMAIN_PREFIX + process.env.VUE_APP_BASE_API,
    url: opts.url,
    responseType: opts.responseType || '',
    timeout: 20000
  }
  if (opts['meta']) {
    httpDefaultOpts.headers = opts['meta']
  }

  const dataRequest = ['PUT', 'POST', 'PATCH']
  if (dataRequest.includes(method)) {
    httpDefaultOpts.data = opts.data || {}
  } else {
    httpDefaultOpts.params = {
      ...publicParams,
      ...(opts.data || {})
    }
  }

  // formData转换
  if (opts.formData) {
    httpDefaultOpts.transformRequest = [data => {
      const formData = new FormData()
      if (data) {
        Object.entries(data).forEach(item => {
          formData.append(item[0], item[1])
        })
      }
      return formData
    }]
  }

  const promise = new Promise((resolve, reject) => {
    service(httpDefaultOpts).then(response => {
      handleSuccess(response, resolve, opts)
    }).catch(error => {
      handleError(error, reject, opts)
    })
  })
  return promise
}

/**
 * 判断token是否过期
 * @returns {boolean}
 */
function isTokenExpired() {
  // token过期时间戳
  let expiredTime = new Date(db.get('EXPIRE_TIME', '')).getTime()
  // 当前时间戳
  let nowTime = new Date().getTime()

  return nowTime >= expiredTime;
}


/**
 * 设置token、refreshToken、expiration 缓存
 * @param token
 * @param refreshToken
 * @param expiration
 * @param that
 */
function saveLoginData (token, refreshToken, expiration) {
  store.commit("account/setToken", token);
  store.commit("account/setRefreshToken", refreshToken);
  store.commit("account/setExpireTime", expiration);
}


export default httpServer
