/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 周推荐播放API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../AxiosRequest.js";
import commonReq from "../../../public/commonReq";

//周推荐播放列表
export const weekPage = data =>
  request({
    url: '/partycloud/broadcast/week/backPage',
    method: 'post',
    data: data
  })

// 周推荐播放新增保存
export const weekSave = data =>
  request({
    url: '/partycloud/broadcast/week/save',
    method: 'post',
    data: data
  })

// 周推荐播放详情
export const getWeekInfo = data =>
  request({
    url: '/partycloud/broadcast/week/detail',
    method: 'post',
    data: data
  })

// 周推荐播放编辑
export const weekEdit = data =>
  request({
    url: '/partycloud/broadcast/week/update',
    method: 'post',
    data: data
  })

// 周推荐播放删除
export const deleteWeek = data =>
  request({
    url: '/partycloud/broadcast/week/delete',
    method: 'post',
    data: data
  })

/* 导出*/
export const getHistoryExport = data =>{
  let url = '/partycloud/broadcast/week/exportList'
  commonReq.getHistoryExport(data,url)
}
