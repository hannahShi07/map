/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 党员进小区(活动)API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'


/*党员进小区(活动)列表查询*/

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

export const getActivedList = data =>
  request({
    url: '/partycloud/memberPlotActivity/findBackPage',
    method: 'post',
    data: data
  })

/*党员进小区(活动)列表删除*/

/*参数 {
  ids:[]
}*/

export const getActivedDetele = data =>
  request({
    url: '/partycloud/memberPlotActivity/delete',
    method: 'post',
    data: data
  })

/*党员进小区(活动)列表详情*/

/*参数 {
  id:''
}*/

export const getActivedDetail = data =>
  request({
    url: '/partycloud/memberPlotActivity/findOne',
    method: 'post',
    data: data
  })





/*党员进小区(活动)列表新增*/

/*参数 {
  必填项
}*/

export const getActivedAdd = data =>
  request({
    url: '/partycloud/memberPlotActivity/save',
    method: 'post',
    data: data
  })

/*党员进小区(活动)列表编辑*/

/*参数 {
  必填项
}*/

export const getActivedEdit = data =>
  request({
    url: '/partycloud/memberPlotActivity/update',
    method: 'post',
    data: data
  })

/*党员进小区(活动)列表导出*/

/*参数 {
  data
}*/

export const getActivedExport = data =>{
  let url = '/partycloud/memberPlotActivity/export'
  commonReq.getHistoryExport(data,url)
}

/*选择人员,获取人员信息数据*/
/*参数 {
  orgId:{
    data:'',
    key:''
  },
  info:''

}*/

export const getPersoninfo = data =>
  request({
    url: '/partycloud/djMember/selectMemberListByOrgCode',
    method: 'post',
    data: data
  })
