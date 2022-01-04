/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 园区简介管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../../AxiosRequest.js";
import commonReq from "../../../../../public/commonReq.js";

/*列表查询*/
export const getpageList = data =>
  request({
    url: "/partycloud/parkScreen/pageInfo",
    method: "post",
    data: data
  });

/*新增*/
export const getpageAdd = data =>
  request({
    url: "/partycloud/parkScreen/savePark",
    method: "post",
    data: data
  });

/*编辑、删除*/
export const getpageEdit = data =>
  request({
    url: "/partycloud/parkScreen/updatePark",
    method: "post",
    data: data
  });

/*详情查询*/
export const getpageDetail = data =>
  request({
    url: "/partycloud/parkScreen/detailPark",
    method: "post",
    data: data
  });
