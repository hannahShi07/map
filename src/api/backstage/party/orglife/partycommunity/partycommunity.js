/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description  党员进小区API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'


/*党员进小区列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'orgId':'',
		"name": "",
		"reportDate": "",
		"livingCommunity": ""
  },
  "size": 每页条数
}*/

export const getCommunityList = data =>
  request({
    url: '/partycloud/memberPlot/findPage',
    method: 'post',
    data: data
  })

/*党员进小区列表删除*/

/*参数 {
  ids:[]
}*/

export const getCommunityDetele = data =>
  request({
    url: '/partycloud/memberPlot/delete',
    method: 'post',
    data: data
  })

/*党员进小区列表详情*/

/*参数 {
  id:''
}*/

export const getCommunityDetail = data =>
  request({
    url: '/partycloud/memberPlot/find',
    method: 'post',
    data: data
  })





/*党员进小区列表新增*/

/*参数 {
  必填项
}*/

export const getCommunityAdd = data =>
  request({
    url: '/partycloud/memberPlot/save',
    method: 'post',
    data: data
  })

/*党员进小区列表编辑*/

/*参数 {
  必填项
}*/

export const getCommunityEdit = data =>
  request({
    url: '/partycloud/memberPlot/update',
    method: 'post',
    data: data
  })

/*党员进小区列表导出*/

/*参数 {
  id:''
}*/

export const getCommunityExport = data =>{
  let url = '/partycloud/memberPlot/exportData'
  commonReq.getHistoryExport(data,url)
}

/*党员进小区列表统计表导出*/

/*参数 {

}*/

export const getCommunityTable = data =>{
  let url = '/partycloud/memberPlot/exportCountCategory'
  commonReq.getHistoryExport(data,url)
}

/*选择人员下拉框数据*/
/*参数 {
  id:''
}*/

export const getCommunityperson = data =>
  request({
    url: '/partycloud/memberPlot/findSelect',
    method: 'post',
    data: data
  })

