import axiosApi from '@/api/AxiosApi.js'

const apiList = {
  page: {
    method: 'POST',
    url: `/authority/dictionaryItem/page`
  },
  getDictByTypes: {
    method: 'GET',
    url: `/partycloud/dict/findDictByTypeIds`
  }
}

export default {
  page (data) {
    return axiosApi({
      ...apiList.page,
      data
    })
  },

  getDictByTypes (data) {
    return axiosApi({
      ...apiList.getDictByTypes,
      data
    })
  }

}
