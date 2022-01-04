/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 督查通报前台API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*督查通报列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'orgId':'',
		"articleSource": "",
		"articleTitle": "",
		"releaseTime": ""
  },
  "size": 每页条数
}*/

export const getInspectionList = data =>
  request({
    url: '/partycloud/inspectionReport/list',
    method: 'post',
    data: data
  })

/*督查通报列表详情*/

/*参数 {
  id:''
}*/

export const getInspectionDetail = data =>
  request({
    url: '/partycloud/inspectionReport/find',
    method: 'post',
    data: data
  })

/*督查通报列表详情-下载*/

/*参数 {
  id:''
}*/

export const getDetailexport = data =>{
  let url = '/partycloud/inspectionReport/exportEB'
  commonReq.getHistoryExport(data,url)

}
