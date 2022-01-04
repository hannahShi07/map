/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 年度播放计划API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../AxiosRequest.js";
import commonReq from "../../../public/commonReq";

//年度播放计划列表
export const yearPage = data =>
  request({
    url: '/partycloud/broadcast/year/findPage',
    method: 'post',
    data: data
  })

// 年度播放计划新增保存
export const yearSave = data =>
  request({
    url: '/partycloud/broadcast/year/add',
    method: 'post',
    data: data
  })

// 年度播放计划详情
export const getYearInfo = data =>
  request({
    url: '/partycloud/broadcast/year/findOne',
    method: 'post',
    data: data
  })

// 年度播放计划编辑
export const yearEdit = data =>
  request({
    url: '/partycloud/broadcast/year/update',
    method: 'post',
    data: data
  })

// 年度播放计划删除
export const deleteYear = data =>
  request({
    url: '/partycloud/broadcast/year/delete',
    method: 'post',
    data: data
  })

/* 导出*/
export const getHistoryExport = data =>{
  let url = '/partycloud/broadcast/year/exportList'
  commonReq.getHistoryExport(data,url)
}
