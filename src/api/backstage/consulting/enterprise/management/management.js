/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 企业管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//企业管理列表
export const enterprisePage = data =>
  request({
    url: '/partycloud/enterprise/enterprisePage',
    method: 'post',
    data: data
  })

// 企业管理新增保存
export const enterpriseSave = data =>
  request({
    url: '/partycloud/enterprise/saveEnterprise',
    method: 'post',
    data: data
  })
// 企业管理编辑
export const enterpriseEdit = data =>
  request({
    url: '/partycloud/enterprise/updateEnterprise',
    method: 'post',
    data: data
  })

// 企业管理删除
export const updateEnterprise = data =>
  request({
    url: '/partycloud/enterprise/deleteEnterprise',
    method: 'post',
    data: data
  })

// 企业管理详情
export const enterpriseInfo = data =>
  request({
    url: '/partycloud/enterprise/getEnterprise',
    method: 'post',
    data: data
  })

// 企业模糊搜索
export const enterpriseSelect = data =>
  request({
    url: '/partycloud/enterprise/findEntPage',
    method: 'post',
    data: data
  })

// 企业导出
export const getEnterpriseExport = data =>{
  let url = '/partycloud/enterprise/exportEnterprise'
  commonReq.getHistoryExport(data,url)
}

// 企业基本信息接口
export const enterpriseInformation = data =>
  request({
    url: '/partycloud/enterprise/findEntInfo',
    method: 'post',
    data: data
  })