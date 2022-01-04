/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 机关干部选任API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*机关干部选任列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getElectedofficialsList = data =>
  request({
    url: "/partycloud/officerChange/findList",
    method: "post",
    data: data
  });

/*机关干部选任列表删除*/

/*参数 {
 id:'',
isDelete:
}*/

export const getElectedofficialsDetele = data =>
  request({
    url: "/partycloud/officerChange/delete",
    method: "post",
    data: data
  });

/*机关干部选任列表详情*/

/*参数 {
  id:''
}*/

export const getElectedofficialsDetail = data =>
  request({
    url: "/partycloud/officerChange/findDetail",
    method: "post",
    data: data
  });

/*机关干部选任列表新增*/

/*参数 {
  必填项
}*/

export const getElectedofficialsAdd = data =>
  request({
    url: "/partycloud/officerChange/save",
    method: "post",
    data: data
  });

/*机关干部选任列表编辑*/

/*参数 {
  必填项
}*/

export const getElectedofficialsEdit = data =>
  request({
    url: "/partycloud/officerChange/update",
    method: "post",
    data: data
  });
