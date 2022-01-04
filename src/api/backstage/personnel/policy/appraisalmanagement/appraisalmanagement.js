/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 考核管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

// （接口暂时没有不写）

/*考核管理列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getAppraisalList = data =>
  request({
    url: "/partycloud/humanPolicy/findList",
    method: "post",
    data: data
  });

/*考核管理列表删除*/

/*参数 {
 id:'',
isDelete:
}*/

export const getAppraisalDetele = data =>
  request({
    url: "/partycloud/humanPolicy/delete",
    method: "post",
    data: data
  });

/*考核管理列表详情*/

/*参数 {
  id:''
}*/

export const getAppraisalDetail = data =>
  request({
    url: "/partycloud/humanPolicy/detail",
    method: "post",
    data: data
  });

/*考核管理列表新增*/

/*参数 {
  必填项
}*/

export const getAppraisalAdd = data =>
  request({
    url: "/partycloud/humanPolicy/save",
    method: "post",
    data: data
  });

/*考核管理列表编辑*/

/*参数 {
  必填项
}*/

export const getAppraisalEdit = data =>
  request({
    url: "/partycloud/humanPolicy/update",
    method: "post",
    data: data
  });
