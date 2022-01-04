/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 门户管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//门户保存
export const gatewaySave = data =>
  request({
    url: '/partycloud/parkprofile/save',
    method: 'post',
    data: data
  })

// 列表
export const gatewayList = data =>
  request({
    url: '/partycloud/parkprofile/list',
    method: 'post',
    data: data
  })

/* 修改 */
export const gatewayEdit = data =>
request({
  url: '/partycloud/parkprofile/update',
  method: 'post',
  data: data
})

/* 删除 */
export const gatewayDelete = data =>
request({
  url: '/partycloud/parkprofile/delete',
  method: 'post',
  data: data
})

/* 详情 */
export const gatewayInfo = data =>
request({
  url: '/partycloud/parkprofile/getDeatilById',
  method: 'post',
  data: data
})

/* 园区介绍等(只有新增页的)回显 */
export const gatewaySearch = data =>
request({
  url: '/partycloud/parkprofile/introducedDeatil',
  method: 'post',
  data: data
})

/* 点击量+1 */
export const clickNum = data =>
request({
  url: '/partycloud/parkprofile/incNum',
  method: 'post',
  data: data
})
