// 干部选任
/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 干部选任API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*干部选任列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getOfficerChangeList = data =>
  request({
    url: "/partycloud/officerChange/findBeforeList",
    method: "post",
    data: data
  });

/*干部选任列表详情*/

/*参数 {
  id:''
}*/

export const getOfficerChangeDetail = data =>
  request({
    url: "/partycloud/officerChange/findDetail",
    method: "post",
    data: data
  });

/*考察信息列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getInspectMessageList = data =>
  request({
    url: "/partycloud/inspectMessage/findBeforeList",
    method: "post",
    data: data
  });

/*考察信息详情*/

/*参数 {
  id:''
}*/

export const getInspectMessageDetail = data =>
  request({
    url: "/partycloud/inspectMessage/detail",
    method: "post",
    data: data
  });
