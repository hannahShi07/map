/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 站点管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../AxiosRequest.js";
import commonReq from "../../../public/commonReq";

//站点管理列表
export const findBackPage = data =>
  request({
    url: '/partycloud/site/findBackPage',
    method: 'post',
    data: data
  })

// 站点管理员管理新增保存
export const siteSave = data =>
  request({
    url: '/partycloud/site/save',
    method: 'post',
    data: data
  })

// 站点管理员获取管理员
export const findAssume = data =>
  request({
    url: '/partycloud/siteManager/findAssume',
    method: 'post',
    data: data
  })

// 站点管理员详情
export const getSiteInfo = data =>
  request({
    url: '/partycloud/site/findOne',
    method: 'post',
    data: data
  })

// 站点管理员编辑
export const siteEdit = data =>
  request({
    url: '/partycloud/site/update',
    method: 'post',
    data: data
  })

// 站点管理删除
export const deleteSite = data =>
  request({
    url: '/partycloud/site/delete',
    method: 'post',
    data: data
  })

/* 导出*/
export const getHistoryExport = data =>{
  let url = '/partycloud/site/exportPage'
  commonReq.getHistoryExport(data,url)
}