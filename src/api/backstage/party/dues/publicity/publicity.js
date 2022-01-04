/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 党费管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

export const getPublicityList = data =>
  request({
    url: '/partycloud/duesNotice/getDuesNoticeList',
    method: 'post',
    data: data
  })

  /* 历史人员库-导出*/
export const getHistoryExport = data =>{
  let url = '/partycloud/duesNotice/exportDuesNotice'
  commonReq.getHistoryExport(data,url)
}

// 党员信息
export const getPartyMember = data =>
  request({
    url: '/partycloud/djMember/memberPage',
    method: 'post',
    data: data
  })

// 新增保存
export const savePublicity = data =>
  request({
    url: '/partycloud/duesNotice/addDuesNotice',
    method: 'post',
    data: data
  })

// 编辑保存
export const editPublicity = data =>
  request({
    url: '/partycloud/duesNotice/updateDuesNotice',
    method: 'post',
    data: data
  })

// 查看详情
export const publicityInfo = data =>
  request({
    url: '/partycloud/duesNotice/getDuesNoticeDeatil',
    method: 'post',
    data: data
  })

// 删除
export const deletePublicityList = data =>
request({
  url: '/partycloud/duesNotice/deleteDuesNotice',
  method: 'post',
  data: data
})

// 查询缴费金额
export const searchCollection = data =>
request({
  url: '/partycloud/duesCollection/getDuesTotal',
  method: 'post',
  data: data
})
