/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 理事会和机构管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../../AxiosRequest.js";
/*理事会和机构管理列表查询*/
export const getInstitutionalList = data =>
  request({
    url: "/partycloud/unionCouncil/councilPage",
    method: "post",
    data: data
  });

/*理事会和机构管理列表新增*/
export const getInstitutionalAdd = data =>
  request({
    url: "/partycloud/unionCouncil/addCouncil",
    method: "post",
    data: data
  });

/*理事会和机构管理列表编辑*/
export const getInstitutionalEdit = data =>
  request({
    url: "/partycloud/unionCouncil/updateCouncil",
    method: "post",
    data: data
  });

/*理事会和机构管理列表删除*/
export const getInstitutionalDetele = data =>
  request({
    url: "/partycloud/unionCouncil/deleteCouncil",
    method: "post",
    data: data
  });

/*理事会和机构管理列表详情*/
export const getInstitutionalDetail = data =>
  request({
    url: "/partycloud/unionCouncil/findSimpleCouncil",
    method: "post",
    data: data
  });



