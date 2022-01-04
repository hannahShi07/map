/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 党建指导记录API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//党建指导记录列表
export const recordPage = data =>
  request({
    url: '/partycloud/djGuidanceRecord/selectDjGuidanceRecordPage',
    method: 'post',
    data: data
  })

// 党建指导记录新增保存
export const recordSave = data =>
  request({
    url: '/partycloud/djGuidanceRecord/saveDjGuidanceRecord',
    method: 'post',
    data: data
  })

// 党建指导记录详情
export const recordInfo = data =>
  request({
    url: '/partycloud/djGuidanceRecord/selectDjGuidanceRecord',
    method: 'post',
    data: data
  })

// 党建指导记录编辑
export const recordEdit = data =>
  request({
    url: '/partycloud/djGuidanceRecord/updateDjGuidanceRecord',
    method: 'post',
    data: data
  })

// 查询指导员指导的对象
export const recordList = data =>
  request({
    url: '/partycloud/djGuidanceRecord/selectOwnOrgCompany',
    method: 'post',
    data: data
  })

//指导员管理列表
export const guidancePage = data =>
request({
  url: '/partycloud/djGuidanceRecord/selectOwnOrgGuidance',
  method: 'post',
  data: data
})

//删除
export const recordDelete = data =>
  request({
    url: '/partycloud/djGuidanceRecord/deleteOne',
    method: 'post',
    data: data
  })
