/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 党费管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//党费缴纳列表
/*参数 {
  current:0,
  model:{
    collectionDate:'',//缴纳年份
    orgId:'',
  }，
  size:0
}*/

// /partycloud/duesCollection/getDuesCollectionDeatil
export const getCollectionList = data =>
  request({
    url: '/partycloud/duesCollection/getDuesCollectionList',
    method: 'post',
    data: data
  })

// 党员信息
export const getPartyMember = data =>
  request({
    url: '/partycloud/djMember/memberPage',
    method: 'post',
    data: data
  })

/* 新增 */
export const getCollectionSave = data =>
request({
  url: '/partycloud/duesCollection/addDuesCollection',
  method: 'post',
  data: data
})

/* 编辑 */
export const getCollectionEdit = data =>
request({
  url: '/partycloud/duesCollection/updateDuesCollection',
  method: 'post',
  data: data
})

/* 导出*/
export const getHistoryExport = data =>{
  let url = '/partycloud/duesCollection/exportDuesCollection'
  commonReq.getHistoryExport(data,url)
}

/* 删除 */
export const deleteCollectionList = data =>
  request({
    url: '/partycloud/djMember/memberPage',
    method: 'post',
    data: data
  })

/* 详情 */
export const infoCollectionList = data =>
  request({
    url: '/partycloud/duesCollection/getDuesCollectionDetail',
    method: 'post',
    data: data
  })

// 获取党员列表
export const getMembers = data =>
request({
  url: '/partycloud/duesCollection/getDjMember',
  method: 'post',
  data: data
})
