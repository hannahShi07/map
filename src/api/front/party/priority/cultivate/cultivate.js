/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description API培育库(前台）
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";

/*培育库列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
      "memberInfo":"",
      "orgId":"",
      "orgName":"",
      "state":""
  },
  "size": 每页条数
}*/

export const getCultivateList = data =>
  request({
    url: '/partycloud/excellenceCultivate/queryECPageReception',
    method: 'post',
    data: data
  })

/*培育库统计图*/

/*参数 {
}*/

export const getCultivateMap = data =>
  request({
    url: '/partycloud/excellenceCultivate/countECNumbers',
    method: 'post',
    data: data
  })





