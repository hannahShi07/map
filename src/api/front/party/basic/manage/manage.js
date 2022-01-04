/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 流动党员API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";

//前台-正式、预备党员统计
/*参数 {
  "orgId": {
    "data": "",
    "key": 0
  },
}*/

export const getManagestatistics = data =>
  request({
    url: '/partycloud/djMember/countMemberYearNumber',
    method: 'post',
    data: data
  })

//前台-流动党员分页查询
/*参数 {
  "current": 当前页数,
  "model": {
      "orgCode": "",//组织编码
  },
  "size": 每页条数
}*/

export const getManagepage = data =>
  request({
    url: '/partycloud/djMember/memberPageFront',
    method: 'post',
    data: data
  })

/*流动党员详情*/
/*参数 {
  id:''
}*/

export const getHistoryDetail = data =>
  request({
    url: '/partycloud/djMember/viewMemberFront',
    method: 'post',
    data: data
  })
