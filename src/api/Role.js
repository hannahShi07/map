import axiosApi from './AxiosApi.js'

const apiList = {
  page: {
    url: `/authority/role/page`,
    method: 'POST'
  },
  save: {
    url: `/authority/role`,
    method: 'POST'
  },
  update: {
    url: `/authority/role`,
    method: 'PUT'
  },
  delete: {
    url: `/authority/role`,
    method: 'DELETE'
  },
  saveUserRole: {
    url: `/authority/role/user`,
    method: 'POST'
  },
  saveRoleAuthority: {
    url: `/authority/role/authority`,
    method: 'POST'
  },
  preview: {
    method: 'POST',
    url: `/authority/user/preview`
  },
  export: {
    method: 'POST',
    url: `/authority/user/export`
  },
  import: {
    method: 'POST',
    url: `/authority/role/import`
  },
  disEnableRoles: {
    url: `/partycloud/authRole/disEnableRoles`,
    method: 'POST'
  },
  list: {
    url: `/authority/role/query`,
    method: 'POST'
  },
  findParyAuthorityIdByRoleId: {
    url: `/authority/role/findParyAuthorityIdByRoleId`,
    method: 'POST'
  },
  savePartyRoleAuthority: {
    url: `/authority/role/savePartyRoleAuthority`,
    method: 'POST'
  },

}

export default {
  page (data) {
    return axiosApi({
      ...apiList.page,
      // formData: true,
      data
    })
  },
  save (data) {
    return axiosApi({
      ...apiList.save,
      data
    })
  },
  update (data) {
    return axiosApi({
      ...apiList.update,
      data
    })
  },
  delete (data) {
    return axiosApi({
      ...apiList.delete,
      data
    })
  },
  get (id) {
    return axiosApi({
      url: `/authority/role/${id}`,
      method: 'GET'
    })
  },
  getDetails (id) {
    return axiosApi({
      url: `/authority/role/details/${id}`,
      method: 'GET'
    })
  },
  check (code) {
    return axiosApi({
      url: `/authority/role/check/${code}`,
      method: 'GET'
    })
  },
  saveUserRole (data) {
    return axiosApi({
      ...apiList.saveUserRole,
      data
    })
  },
  findUserIdByRoleId (roleId) {
    return axiosApi({
      url: `/authority/role/user/${roleId}`,
      method: 'GET'
    })
  },
  findAuthorityIdByRoleId (roleId) {
    return axiosApi({
      url: `/authority/role/authority/${roleId}`,
      method: 'GET'
    })
  },
  saveRoleAuthority (data) {
    return axiosApi({
      ...apiList.saveRoleAuthority,
      data
    })
  },
  preview (data) {
    return axiosApi({
      ...apiList.preview,
      data
    })
  },
  export (data) {
    return axiosApi({
      ...apiList.export,
      responseType: "blob",
      data
    })
  },
  import (data) {
    return axiosApi({
      ...apiList.import,
      data
    })
  },
  disEnableRoles (data) {
    return axiosApi({
      ...apiList.disEnableRoles,
      data
    })
  },
  list (data) {
    return axiosApi({
      ...apiList.list,
      data
    })
  },
  findParyAuthorityIdByRoleId (data) {
    return axiosApi({
      ...apiList.findParyAuthorityIdByRoleId,
      data
    })
  },
  savePartyRoleAuthority (data) {
    return axiosApi({
      ...apiList.savePartyRoleAuthority,
      data
    })
  }
}
