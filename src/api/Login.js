import axiosApi from './AxiosApi.js'

const apiList = {
  captcha: `/oauth/anno/captcha`,
  login: `/oauth/anno/token`,
  // router: `/oauth/menu/router`,
  router: `/oauth/menu/routerLaterAndFront`,
  resource: `/oauth/resource/visible`,
  routers: `/partycloud/authRole/routers`,
}

export default {
  getCaptcha (randomId) {
    return axiosApi({
      method: 'GET',
      url: apiList.captcha + `?key=${randomId}`,
      responseType: 'arraybuffer',
      meta: {
        "X-isToken": false
      }
    })
  },
  login (data) {
    return axiosApi({
      method: 'POST',
      url: apiList.login,
      data
    })
  },
  getRouter (data) {
    return axiosApi({
      method: 'GET',
      url: apiList.router,
      data: data || {}
    })
  },
  getRouters (data) {
    return axiosApi({
      method: 'GET',
      url: apiList.routers,
      data: data || {}
    })
  },
  getResource (data) {
    return axiosApi({
      method: 'GET',
      url: apiList.resource,
      data: data || {}
    })
  }
}
