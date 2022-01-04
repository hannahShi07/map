/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 党建指导员API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";


/*前台统计图数据
* */
export const getInstructorChars = data =>
  request({
    url: '/partycloud/djGuidance/selectNumList',
    method: 'post',
    data: data
  })
//指导员列表

export const getInstructorList = data =>
  request({
    url: '/partycloud/djGuidance/selectBeforeList',
    method: 'post',
    data: data
  })
// 指导记录列表
export const recordList = data =>
  request({
    url: '/partycloud/djGuidance/selectRecordPage',
    method: 'post',
    data: data
  })

// 指导员管理详情
export const getGuidanceInfo = data =>
request({
  url: '/partycloud/djGuidance/selectDjGuidance',
  method: 'post',
  data: data
})
