/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 主题党日前台API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*主题党日列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
		'ids':null,//id数组
    'orgCode':'',//党组织编码
    'orgName':'',//党组织名称
    'meetingType':'',//会议类型
    'meetingName':'',//会议名称
    'state':'',//会议状态
    'endTime':'',//结束时间
    'beginTime':'',//开始时间
  },
  "size": 每页条数
}*/

export const getMeetingList = data =>
  request({
    url: '/partycloud/orgLife/selectOrgLifePage',
    method: 'post',
    data: data
  })

/*主题党日图表统计查询*/

/*参数 {

}*/

export const getMeetingTable = data =>
  request({
    url: '/partycloud/orgLife/thematicCount',
    method: 'post',
    data: data
  })
