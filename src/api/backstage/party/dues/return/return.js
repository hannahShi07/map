/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description API党费返还
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/* 党费返还-导出*/
export const getReturnExport = data =>{
  let url = '/partycloud/memberDuesBack/exportMemberDuesBack'
  commonReq.getHistoryExport(data,url)
}

/* 获取列表 */
export const getReturnList = data =>
  request({
    url: '/partycloud/memberDuesBack/getDjMemberDuesBackList',
    method: 'post',
    data: data
  })

/* 新增 */
export const addReturn = data =>
  request({
    url: '/partycloud/memberDuesBack/saveDjMemberDuesBack',
    method: 'post',
    data: data
  })

/* 组织 */
export const getOrg = data =>
  request({
    url: '/partycloud/djOrg/getDjOrgListByType',
    method: 'post',
    data: data
  })

//* 删除 */
export const deleteReturnList = data =>
  request({
    url: '/partycloud/memberDuesBack/deleteDjMemberDuesBack',
    method: 'post',
    data: data
  })

/* 详情 */
export const returnInfo = data =>
  request({
    url: '/partycloud/memberDuesBack/getDjMemberDuesBackDeatil',
    method: 'post',
    data: data
  })

/* 编辑 */
export const returnEdit = data =>
request({
  url: '/partycloud/memberDuesBack/updateDjMemberDuesBack',
  method: 'post',
  data: data
})

/* 组织 */
export const getOrgList = data =>
  request({
    url: '/partycloud/djOrg/getDjOrgListByType',
    method: 'post',
    data: data
  })
  
  /* 获取年度党缴纳金额 */
export const getYearDuesTotal = data =>
request({
  url: '/partycloud/duesCollection/getYearDuesTotal',
  method: 'post',
  data: data
})