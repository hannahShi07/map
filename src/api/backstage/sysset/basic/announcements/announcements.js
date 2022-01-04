/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 公告管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*公告管理列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getAnnouncementsList = data =>
  request({
    url: "/partycloud/issue/findIssueNotice",
    method: "post",
    data: data
  });

/*公告管理列表删除(接口没有)*/

/*参数 {
 id:'',
isDelete:
}*/

export const getAnnouncementsDetele = data =>
  request({
    url: "/partycloud/issue/deleteIssueNotice",
    method: "post",
    data: data
  });

/*公告管理列表详情*/

/*参数 {
  id:''
}*/

export const getAnnouncementsDetail = data =>
  request({
    url: "/partycloud/issue/viewIssueNotice",
    method: "post",
    data: data
  });

/*公告管理列表新增*/

/*参数 {
  必填项
}*/

export const getAnnouncementsAdd = data =>
  request({
    url: "/partycloud/issue/addIssue",
    method: "post",
    data: data
  });

/*公告管理列表编辑*/

/*参数 {
  必填项
}*/

export const getAnnouncementsEdit = data =>
  request({
    url: "/partycloud/issue/updateIssueNotice",
    method: "post",
    data: data
  });
