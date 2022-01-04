/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 党建指导员管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//指导员管理列表
export const guidancePage = data =>
  request({
    url: '/partycloud/djGuidance/selectDjGuidancePage',
    method: 'post',
    data: data
  })

// 指导员新增保存
export const guidanceSave = data =>
  request({
    url: '/partycloud/djGuidance/saveDjGuidance',
    method: 'post',
    data: data
  })

// 指导记录列表
export const recordList = data =>
  request({
    url: '/partycloud/djGuidance/selectRecordPage',
    method: 'post',
    data: data
  })

// 指导员管理详情
export const getGuidanceInfo = data =>
  request({
    url: '/partycloud/djGuidance/selectDjGuidance',
    method: 'post',
    data: data
  })

// 指导员管理编辑
export const guidanceEdit = data =>
  request({
    url: '/partycloud/djGuidance/updateDjGuidance',
    method: 'post',
    data: data
  })

// 指导员管理启用/停用
export const updateGuidance = data =>
  request({
    url: '/partycloud/djGuidance/updateIsDeleteById',
    method: 'post',
    data: data
  })

// 指导记录详情
export const recordInfo = data =>
  request({
    url: '/partycloud/djGuidanceRecord/selectDjGuidanceRecord',
    method: 'post',
    data: data
  })
