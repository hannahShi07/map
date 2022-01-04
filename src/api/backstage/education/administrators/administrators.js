/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 站点管理员管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../AxiosRequest.js";
import commonReq from "../../../public/commonReq";

//站点管理员管理列表
export const findPage = data =>
  request({
    url: '/partycloud/siteManager/findPage',
    method: 'post',
    data: data
  })

// 站点管理员管理新增保存
export const findSave = data =>
  request({
    url: '/partycloud/siteManager/save',
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
export const getAdmInfo = data =>
  request({
    url: '/partycloud/siteManager/detail',
    method: 'post',
    data: data
  })

// 站点管理员保存
export const admEdit = data =>
  request({
    url: '/partycloud/siteManager/update',
    method: 'post',
    data: data
  })

// 站点管理员删除
export const deleteAdministrators = data =>
  request({
    url: '/partycloud/siteManager/delete',
    method: 'post',
    data: data
  })

/* 导出*/
export const getHistoryExport = data =>{
  let url = '/partycloud/siteManager/exportPage'
  commonReq.getHistoryExport(data,url)
}
  