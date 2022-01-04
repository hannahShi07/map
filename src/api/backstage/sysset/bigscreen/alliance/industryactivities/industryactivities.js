/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 产业链集群活动清单API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../../AxiosRequest.js";
import commonReq from "../../../../../public/commonReq.js";

/*列表查询*/
export const getpageList = data =>
  request({
    url: "/partycloud/industryActivity/pageList",
    method: "post",
    data: data
  });

/*新增*/
export const getpageAdd = data =>
  request({
    url: "/partycloud/industryActivity/add",
    method: "post",
    data: data
  });

/*编辑*/
export const getpageEdit = data =>
  request({
    url: "/partycloud/industryActivity/edit",
    method: "post",
    data: data
  });

/*删除*/
export const getpageDelete = data =>
  request({
    url: "/partycloud/industryActivity/delete",
    method: "post",
    data: data
  });

/*详情查询*/
export const getpageDetail = data =>
  request({
    url: "/partycloud/industryActivity/detail",
    method: "post",
    data: data
  });
