/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 任务清单API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";


//前台-任务清单分页查询
/*参数 {
  "current": 当前页数,
  "model": {
      "orgCode":"",
  },
  "size": 每页条数
}*/

export const getTaslList = data =>
  request({
    url: '/partycloud/taskIssue/queryTIReception',
    method: 'post',
    data: data
  })
