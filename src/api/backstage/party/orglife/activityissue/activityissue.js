/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 活动发布API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'


/*活动发布列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
		"orgId": "",
		"orgName": "",
		"startDate": "",
		"theme": ""
  },
  "size": 每页条数
}*/

export const getMeetingList = data =>
  request({
    url: '/partycloud/activity/activityList',
    method: 'post',
    data: data
  })

/*活动发布列表删除*/

/*参数 {
  ids:[]
}*/

export const getMeetingDetele = data =>
  request({
    url: '/partycloud/activity/activityDelete',
    method: 'post',
    data: data
  })

/*活动发布列表详情*/

/*参数 {
  id:''
}*/

export const getMeetingDetail = data =>
  request({
    url: '/partycloud/activity/activityDeatil',
    method: 'post',
    data: data
  })





/*活动发布列表新增*/

/*参数 {
  必填项
}*/

export const getMeetingAdd = data =>
  request({
    url: '/partycloud/activity/activitySave',
    method: 'post',
    data: data
  })

/*活动发布列表编辑*/

/*参数 {
  必填项
}*/

export const getMeetingEdit = data =>
  request({
    url: '/partycloud/activity/activityEdit',
    method: 'post',
    data: data
  })

/*活动发布列表导出*/

/*参数 {
  data
}*/

export const getMeetingExport = data =>{
  let url = '/partycloud/activity/exportActivityExcel'
  commonReq.getHistoryExport(data,url)
}


