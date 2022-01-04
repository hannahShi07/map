/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 党费管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//审核列表
export const dueAudit = data =>
  request({
    url: '/partycloud/dueAudit/selectDueAuditList',
    method: 'post',
    data: data
  })

//审核详情
export const examineInfo = data =>
  request({
    url: '/partycloud/dueAudit/selectDueAuditById',
    method: 'post',
    data: data
  })

//审核
export const examineSave = data =>
  request({
    url: '/partycloud/dueAudit/saveDueAudit',
    method: 'post',
    data: data
  })

//缴费记录
export const duesRecord = data =>
  request({
    url: '/partycloud/dueRecord/selectDueRecord',
    method: 'post',
    data: data
  })

// 列表
export const duesList = data =>
  request({
    url: '/partycloud/dueRecord/selectDueRecordList',
    method: 'post',
    data: data
  })

/* 新增 */
export const duesSave = data =>
request({
  url: '/partycloud/dueRecord/saveDueRecord',
  method: 'post',
  data: data
})

/* 查询党员应缴月份 */
export const searchMonth = data =>
request({
  url: '/partycloud/dueRecord/selectNeedPayMonth',
  method: 'post',
  data: data
})

/* 查询党员 */
export const searchMember = data =>
request({
  url: '/partycloud/djMember/selectMemberListByOrgCode',
  method: 'post',
  data: data
})

/* 导出*/
export const getHistoryExport = data =>{
  let url = '/partycloud/dueRecord/exportDueRecord'
  commonReq.getHistoryExport(data,url)
}

/* 导出*/
export const getHistoryExportRec = data =>{
  let url = '/partycloud/dueRecord/exportDueRecordList'
  commonReq.getHistoryExport(data,url)
}
