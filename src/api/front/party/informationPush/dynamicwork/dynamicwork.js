/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 工作动态API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";


//前台-工作动态分页查询
/*参数 {
  "current": 当前页数,
  "model": {
      "orgCode": "",//组织编码
  },
  "size": 每页条数
}*/

export const getDynamicworkpage = data =>
  request({
    url: '/partycloud/workTrend/queryWTPageReception',
    method: 'post',
    data: data
  })

/*工作动态——详情*/
/*参数 {
  id:''
}*/

export const getDynamicworkDetail = data =>
  request({
    url: '/partycloud/workTrend/queryWTDetails',
    method: 'post',
    data: data
  })

