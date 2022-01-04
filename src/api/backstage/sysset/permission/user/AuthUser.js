/**
 * 账户
 * @Author: dfzhu
 * @Date: 2020/12/8
 */

import axiosApi from '@/api/AxiosApi.js'

const apiList = {
  page: {
    method: "POST",
    url: "/partycloud/authUser/userPage"
  },
  save: {
    method: "POST",
    url: "/partycloud/authUser/addUser"
  },
  update: {
    method: "POST",
    url: "/partycloud/authUser/updateUser"
  },
  delete: {
    method: "POST",
    url: "/partycloud/authUser/deleteUsers"
  },
  disEnable: {
    method: "POST",
    url: "/partycloud/authUser/disEnableUsers"
  },
  validUserMobileIsSingle: {
    method: "POST",
    url: "/partycloud/authUser/validUserMobileIsSingle"
  },
  resetPassword: {
    method: "POST",
    url: "/partycloud/authUser/resetPassword"
  },
  selectMemberList: {
    method: "POST",
    url: "/partycloud/authUser/selectMemberList"
  },
  findUserById: {
    method: "POST",
    url: "/partycloud/authUser/findUserById"
  },
}

export default {
  page (data) {
    return axiosApi({
      ...apiList.page,
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
  disEnable (data) {
    return axiosApi({
      ...apiList.disEnable,
      data
    })
  },
  validUserMobileIsSingle (data) {
    return axiosApi({
      ...apiList.validUserMobileIsSingle,
      data
    })
  },
  resetPassword (data) {
    return axiosApi({
      ...apiList.resetPassword,
      data
    })
  },
  selectMemberList (data) {
    return axiosApi({
      ...apiList.selectMemberList,
      data
    })
  },
  findUserById (data) {
    return axiosApi({
      ...apiList.findUserById,
      data
    })
  },

}
