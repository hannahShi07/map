/**
 * 站内消息
 * @Author: dfzhu
 * @Date: 2020/12/30
 */
import axiosApi from '@/api/AxiosApi.js'


const apiList = {
  page: {
    method: 'POST',
    url:`/partycloud/dictType/page`,
  },
  update: {
    method: 'PUT',
    url: `/partycloud/dictType`
  },
  save: {
    method: 'POST',
    url: `/partycloud/dictType`
  },
  delete: {
    method: 'DELETE',
    url: `/partycloud/dictType`
  },
  dictTree: {
    method: 'POST',
    url: `/partycloud/dict/dictTree`
  },
  dictPage: {
    method: 'POST',
    url: `/partycloud/dict/dictPage`
  },
  saveDict: {
    method: 'POST',
    url: `/partycloud/dict/saveDict`
  },
  editDict: {
    method: 'POST',
    url: `/partycloud/dict/editDict`
  },
  delDict: {
    method: 'POST',
    url: `/partycloud/dict/delDict`
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
  dictTree (data) {
    return axiosApi({
      ...apiList.dictTree,
      data
    })
  },
  dictPage (data) {
    return axiosApi({
      ...apiList.dictPage,
      data
    })
  },
  saveDict (data) {
    return axiosApi({
      ...apiList.saveDict,
      data
    })
  },
  editDict (data) {
    return axiosApi({
      ...apiList.editDict,
      data
    })
  },
  delDict (data) {
    return axiosApi({
      ...apiList.delDict,
      data
    })
  }
}
