/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 服务企业工作清单API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../../AxiosRequest.js";
import commonReq from "../../../../../public/commonReq.js";

/*列表查询*/
export const getpageList = data =>
  request({
    url: "/partycloud/unionWorkList/workListPage",
    method: "post",
    data: data
  });

/*新增*/
export const getpageAdd = data =>
  request({
    url: "/partycloud/unionWorkList/addWorkList",
    method: "post",
    data: data
  });

/*编辑*/
export const getpageEdit = data =>
  request({
    url: "/partycloud/unionWorkList/updateWorkList",
    method: "post",
    data: data
  });

/*删除*/
export const getpageDelete = data =>
  request({
    url: "/partycloud/unionWorkList/deleteWorkList",
    method: "post",
    data: data
  });

/*详情查询*/
export const getpageDetail = data =>
  request({
    url: "/partycloud/unionWorkList/findSimpleWorkList",
    method: "post",
    data: data
  });
