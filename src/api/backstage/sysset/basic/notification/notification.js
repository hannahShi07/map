/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 通知管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*通知管理列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getNoticeList = data =>
  request({
    url: "/partycloud/notice/findNoticePage",
    method: "post",
    data: data
  });

/*通知管理列表撤销*/

/*参数 {
 id:'',
isDelete:
}*/

export const getNoticeDetele = data =>
  request({
    url: "/partycloud/notice/undoNotice",
    method: "post",
    data: data
  });

/*通知管理列表详情*/

/*参数 {
  id:''
}*/

export const getNoticeDetail = data =>
  request({
    url: "/partycloud/notice/viewNotice",
    method: "post",
    data: data
  });

/*通知管理列表新增*/

/*参数 {
  必填项
}*/

export const getNoticeAdd = data =>
  request({
    url: "/partycloud/notice/addNotice",
    method: "post",
    data: data
  });

/*通知管理列表编辑*/

/*参数 {
  必填项
}*/

export const getNoticeEdit = data =>
  request({
    url: "/partycloud/notice/updateNotice",
    method: "post",
    data: data
  });
