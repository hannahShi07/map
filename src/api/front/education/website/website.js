/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 站点管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../AxiosRequest.js";
import commonReq from "../../../public/commonReq";


/*前台统计图数据*/
export const getSite = data =>
  request({
    url: '/partycloud/site/countSite',
    method: 'post',
    data: data
  })
//站点管理列表
export const getSiteList = data =>
  request({
    url: '/partycloud/site/findFrontPage',
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
