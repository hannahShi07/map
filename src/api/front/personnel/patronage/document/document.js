/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 任免文件API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*任免文件列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getDocumentList = data =>
  request({
    url: "/partycloud/appointFile/findFrontList",
    method: "post",
    data: data
  });

/*任免文件列表详情*/

/*参数 {
  id:''
}*/

export const getDocumentDetail = data =>
  request({
    url: "/partycloud/appointFile/findDetail",
    method: "post",
    data: data
  });
