/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description API示范库
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*示范库列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
      "memberInfo":"",
      "orgId":"",
      "orgName":"",
      "state":""
  },
  "size": 每页条数
}*/

export const getDemonstrationList = data =>
  request({
    url: "/partycloud/excellenceCultivate/queryECPage",
    method: "post",
    data: data
  });

/*示范库-新增-保存*/
/*参数 {
  所有必填项
}*/

export const getDemonstrationAdd = data =>
  request({
    url: "/partycloud/excellenceCultivate/addEC",
    method: "post",
    data: data
  });

/*示范库-新增-组织名称*/
/*参数 {
}*/

export const getDemonstrationName = data =>
  request({
    url: "/partycloud/djOrg/djOrgList",
    method: "post",
    data: data
  });

/*示范库-编辑-保存*/
/*参数 {
  所有必填项
}*/

export const getDemonstrationEdit = data =>
  request({
    url: "/partycloud/excellenceCultivate/editEC",
    method: "post",
    data: data
  });

/*示范库删除*/

/*参数 {
}*/

export const getDemonstrationDelete = data =>
  request({
    url: "/partycloud/excellenceCultivate/deleteEC",
    method: "post",
    data: data
  });

/*示范库-详情*/
/*参数 {
  id:''
}*/

export const getDemonstrationDetail = data =>
  request({
    url: "/partycloud/excellenceCultivate/queryECDetails",
    method: "post",
    data: data
  });

/* 示范库-导出*/
export const getDemonstrationExport = data => {
  let url = "/partycloud/excellenceCultivate/exportECExcel";
  commonReq.getHistoryExport(data, url);
};
