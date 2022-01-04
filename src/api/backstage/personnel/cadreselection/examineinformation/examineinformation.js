/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 考察信息管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*考察信息管理列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getExamineinList = data =>
  request({
    url: "/partycloud/inspectMessage/findList",
    method: "post",
    data: data
  });

/*考察信息管理列表删除*/

/*参数 {
 id:'',
isDelete:
}*/

export const getExamineinDetele = data =>
  request({
    url: "/partycloud/inspectMessage/delete",
    method: "post",
    data: data
  });

/*考察信息管理列表详情*/

/*参数 {
  id:''
}*/

export const getExamineinDetail = data =>
  request({
    url: "/partycloud/inspectMessage/detail",
    method: "post",
    data: data
  });

/*考察信息管理列表新增*/

/*参数 {
  必填项
}*/

export const getExamineinAdd = data =>
  request({
    url: "/partycloud/inspectMessage/save",
    method: "post",
    data: data
  });

/*考察信息管理列表编辑*/

/*参数 {
  必填项
}*/

export const getExamineinEdit = data =>
  request({
    url: "/partycloud/inspectMessage/update",
    method: "post",
    data: data
  });
