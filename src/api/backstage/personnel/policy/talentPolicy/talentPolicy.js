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

export const getTalentpolicyList = data =>
  request({
    url: "/partycloud/humanPolicy/findList",
    method: "post",
    data: data
  });

/*人才政策列表删除*/

/*参数 {
 id:'',
isDelete:
}*/

export const getTalentpolicyDetele = data =>
  request({
    url: "/partycloud/humanPolicy/delete",
    method: "post",
    data: data
  });

/*人才政策列表详情*/

/*参数 {
  id:''
}*/

export const getTalentpolicyDetail = data =>
  request({
    url: "/partycloud/humanPolicy/detail",
    method: "post",
    data: data
  });

/*人才政策列表新增*/

/*参数 {
  必填项
}*/

export const getTalentpolicyAdd = data =>
  request({
    url: "/partycloud/humanPolicy/save",
    method: "post",
    data: data
  });

/*人才政策列表编辑*/

/*参数 {
  必填项
}*/

export const getTalentpolicyEdit = data =>
  request({
    url: "/partycloud/humanPolicy/update",
    method: "post",
    data: data
  });
