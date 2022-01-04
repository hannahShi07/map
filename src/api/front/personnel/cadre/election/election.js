/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 换届选举公示API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*换届选举公示列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getElectionList = data =>
  request({
    url: "/partycloud/changeTeam/findBeforeList",
    method: "post",
    data: data
  });

/*换届选举公示列表详情*/

/*参数 {
  id:''
}*/

export const getElectionDetail = data =>
  request({
    url: "/partycloud/changeTeam/findDetail",
    method: "post",
    data: data
  });
