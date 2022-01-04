/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 人才政策API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*人才政策列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getPolicyList = data =>
  request({
    url: "/partycloud/humanPolicy/findBeforeList",
    method: "post",
    data: data
  });

/*人才政策列表详情*/

/*参数 {
  id:''
}*/

export const getPolicyDetail = data =>
  request({
    url: "/partycloud/humanPolicy/detail",
    method: "post",
    data: data
  });
