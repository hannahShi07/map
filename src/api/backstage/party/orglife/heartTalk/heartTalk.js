/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 谈心谈话API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'


/*三会一课-会议类型
*
* 参数{
*
* }
*
* */
export const getMeetingType= data =>
  request({
    url: '/partycloud/orgLife/selectThreeLessonDictType',
    method: 'post',
    data: data
  })

/*三会一课列表查询*/

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
    url: '/partycloud/orgLife/findOrgLifePage',
    method: 'post',
    data: data
  })

/*三会一课列表删除*/

/*参数 {
  meetingId:''
}*/

export const getMeetingDetele = data =>
  request({
    url: '/partycloud/orgLife/deleteById',
    method: 'post',
    data: data
  })

/*三会一课列表详情*/

/*参数 {
  id:''
}*/

export const getMeetingDetail = data =>
  request({
    url: '/partycloud/orgLife/findById',
    method: 'post',
    data: data
  })

/*三会一课列表导出*/

/*参数 {
  data
}*/

export const getMeetingExport = data =>{
  let url = '/partycloud/orgLife/exportMeetingExcel'
  commonReq.getHistoryExport(data,url)
}

/*三会一课列表会议纪要*/

/*参数 {
  meetingId:'',
  summaryContent:''
}*/

export const getMeetingSummmary = data =>
  request({
    url: '/partycloud/orgLife/summmary',
    method: 'post',
    data: data
  })

/*三会一课列表保存*/

/*参数 {
  必填项
}*/

export const getMeetingAdd = data =>
  request({
    url: '/partycloud/orgLife/save',
    method: 'post',
    data: data
  })

/*三会一课列表编辑*/

/*参数 {
  必填项
}*/

export const getMeetingEdit = data =>
  request({
    url: '/partycloud/orgLife/update',
    method: 'post',
    data: data
  })


/*三会一课列表编辑回显*/

/*参数 {
  id:''
}*/

export const getMeetingeditDetail = data =>
  request({
    url: '/partycloud/orgLife/findViewById',
    method: 'post',
    data: data
  })

/*参与人员-党组织查询
*
* 参数 { name:''}
*
* */
export const getPartyTree = data =>
  request({
    url: '/partycloud/djOrg/djOrgTree',
    method: 'post',
    data: data
  })

/*参与人员-党组织架构 - 选择人员
*
* 参数{ info:'',orgId:''}
*
* */
export const getPartyMemberList= data =>
  request({
    url: '/partycloud/djMember/selectAllMemberList',
    method: 'post',
    data: data
  })

/*参与人员-查询人员名单
*
* 参数{ type:''}//会议类型
*
* */
export const getNameList= data =>
  request({
    url: '/partycloud/orgLifeStaff/findOrgLifeStaff',
    method: 'post',
    data: data
  })

/*参与人员-删除人员名单
*
* 参数{ id:''}
*
* */
export const getNameDelete= data =>
  request({
    url: '/partycloud/orgLifeStaff/deleteStaffById',
    method: 'post',
    data: data
  })

/*参与人员-人员名单查询人员信息
*
* 参数{ id:''}
*
* */
export const getNameInfo= data =>
  request({
    url: '/partycloud/orgLifeStaff/findParticipantsStaff',
    method: 'post',
    data: data
  })


/*参与人员-人员名单新增保存
*
* 参数{
* participantsId:''，
* participantsName:'',
* type:'',
*
* }
*
* */
export const getNameAdd= data =>
  request({
    url: '/partycloud/orgLifeStaff/saveOrgLifeStaff',
    method: 'post',
    data: data
  })

/*参与人员-人员名单修改保存
*
* 参数{
* id:'',
* participantsId:''，
* participantsName:'',
* type:'',
* }
*
* */
export const getNameEdit= data =>
  request({
    url: '/partycloud/orgLifeStaff/updateOrgLifeStaff',
    method: 'post',
    data: data
  })


/*判断是否有新增会议权限
*
* 参数{
* meetingType:''//会议类型
* }
*
* */
export const getIsadd= data =>
  request({
    url: '/partycloud/orgLife/oauth',
    method: 'post',
    data: data
  })

