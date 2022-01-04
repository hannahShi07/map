/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 社会组织管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//社会组织管理列表
export const sociologyPage = data =>
  request({
    url: '/partycloud/enterprise/enterprisePage',
    method: 'post',
    data: data
  })

// 社会组织管理新增保存
export const sociologySave = data =>
  request({
    url: '/partycloud/enterprise/saveSocialOrg',
    method: 'post',
    data: data
  })
// 社会组织管理编辑
export const sociologyEdit = data =>
  request({
    url: '/partycloud/enterprise/updateSocialOrg',
    method: 'post',
    data: data
  })

// 社会组织管理删除
export const sociologyDelete = data =>
  request({
    url: '/partycloud/enterprise/deleteEnterprise',
    method: 'post',
    data: data
  })

// 社会组织管理详情
export const sociologyInfo = data =>
  request({
    url: '/partycloud/enterprise/getEnterprise',
    method: 'post',
    data: data
  })

// 社会组织管理导出
export const getSociologyExport = data =>{
  let url = '/partycloud/enterprise/exportSociaOrg'
  commonReq.getHistoryExport(data,url)
}