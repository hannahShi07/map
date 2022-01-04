/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description 历史人员库模块API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/* 发展党员纪实-导出*/
export const getDevelopExport = data =>{
  let url = '/partycloud/djMemberDevelop/exportMemberDevelop'
  commonReq.getHistoryExport(data,url)
}

/* 发展党员纪实-分页列表查询*/
export const getDevelopPersonByPage = data =>
  request({
    url: '/partycloud/djMemberDevelop/memberDevelopPage',
    method: 'post',
    data: data
  })

/* 发展党员纪实-新增*/
export const getDevelopAdd = data =>
  request({
    url: '/partycloud/djMemberDevelop/addDjMemberDevelop',
    method: 'post',
    data: data
  })

/* 发展党员纪实-编辑*/
export const getDevelopUpdate = data =>
  request({
    url: '/partycloud/djMemberDevelop/updateDjMemberDevelop',
    method: 'post',
    data: data
  })


/* 发展党员纪实-新增发展党员流程*/
export const getDevelopAddStep = data =>
  request({
    url: '/partycloud/djMemberDevelop/addDjMemberDevelopStep',
    method: 'post',
    data: data
  })

/* 发展党员纪实-编辑发展党员流程*/
export const getDevelopUpdateStep = data =>
  request({
    url: '/partycloud/djMemberDevelop/updateDjMemberDevelopStep',
    method: 'post',
    data: data
  })

/* 发展党员纪实-发展党员流程查询接口*/
export const getDevelopDetailStep = data =>
  request({
    url: '/partycloud/djMemberDevelop/stepData',
    method: 'post',
    data: data
  })

/* 审核入党申请 - 列表*/
export const getDevelopSqioPage = data =>
  request({
    url: '/partycloud/sqio/sqioPage',
    method: 'post',
    data: data
  })

/* 审核入党申请 - 详情*/
export const getDevelopSqioDetail = data =>
  request({
    url: '/partycloud/sqio/sqioDetail',
    method: 'post',
    data: data
  })

/* 审核入党申请 - 审核*/
export const getDevelopSqioAudit = data =>
  request({
    url: '/partycloud/sqioAudit/sqioAudit',
    method: 'post',
    data: data
  })
