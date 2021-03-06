import axiosApi from './AxiosApi.js'

const apiList = {
  allTree: {
    method: 'GET',
    url: `/authority/menu/tree`
  },
  save: {
    method: 'POST',
    url: `/authority/menu`
  },
  update: {
    method: 'PUT',
    url: `/authority/menu`
  },
  delete: {
    method: 'DELETE',
    url: `/authority/menu`
  },
  allPartyTree: {
    method: 'POST',
    url: `/authority/menu/partyTree`
  }
}

export default {
  allTree (data) {
    return axiosApi({
      ...apiList.allTree,
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
  allPartyTree (data) {
    return axiosApi({
      ...apiList.allPartyTree,
      data
    })
  }
}
