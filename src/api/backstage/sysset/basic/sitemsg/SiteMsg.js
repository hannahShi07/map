/**
 * 站内消息
 * @Author: dfzhu
 * @Date: 2020/12/30
 */
import axiosApi from '@/api/AxiosApi.js'


const apiList = {
  page: {
    method: "POST",
    url: "/partycloud/sitemsg/findOrgMsgPage"
  },
  tagRead: {
    method: "POST",
    url: "/partycloud/sitemsg/tagRead"
  },
}


export default {
  page (data) {
    return axiosApi({
      ...apiList.page,
      data
    })
  },
  tagRead (data) {
    return axiosApi({
      ...apiList.tagRead,
      data
    })
  },

}
