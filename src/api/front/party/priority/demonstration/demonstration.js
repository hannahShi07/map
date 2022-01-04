/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description API培育库
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";

/*示范库列表查询*/

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

export const getDemonstrationList = data =>
  request({
    url: '/partycloud/excellenceCultivate/queryECPageReception',
    method: 'post',
    data: data
  })


/*示范统计图*/

/*参数 {
}*/

export const getDemonstrationMap = data =>
  request({
    url: '/partycloud/excellenceCultivate/countECNumbers',
    method: 'post',
    data: data
  })


