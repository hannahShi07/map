/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 任免文件管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*任免文件管理列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getAppointfileList = data =>
  request({
    url: "/partycloud/appointFile/findList",
    method: "post",
    data: data
  });

/*任免文件管理列表删除*/

/*参数 {
 id:'',
isDelete:
}*/

export const getAppointfileDetele = data =>
  request({
    url: "/partycloud/appointFile/deleteOne",
    method: "post",
    data: data
  });

/*任免文件管理列表详情*/

/*参数 {
  id:''
}*/

export const getAppointfileDetail = data =>
  request({
    url: "/partycloud/appointFile/findDetail",
    method: "post",
    data: data
  });

/*任免文件管理列表新增*/

/*参数 {
  必填项
}*/

export const getAppointfileAdd = data =>
  request({
    url: "/partycloud/appointFile/save",
    method: "post",
    data: data
  });

/*任免文件管理列表编辑*/

/*参数 {
  必填项
}*/

export const getAppointfileEdit = data =>
  request({
    url: "/partycloud/appointFile/updateOne",
    method: "post",
    data: data
  });
