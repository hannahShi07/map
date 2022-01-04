/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 首页API
 *  @data {{object} data 接口请求参数
 **/
import request from "../AxiosRequest.js";

// 列表
export const getIndexInfo = data =>
  request({
    url: '/partycloud/statisticalSetOther/findStatisticalSetOtherInfo',
    method: 'post',
    data: data
  })

// 高德地图
export const getIndexMap = data =>
  request({
    url: '/partycloud/homeMap/list',
    method: 'post',
    data: data
  })
