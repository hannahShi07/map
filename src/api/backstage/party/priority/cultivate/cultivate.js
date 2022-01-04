/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description API培育库
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*培育库列表查询*/

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

export const getCultivateList = data =>
  request({
    url: "/partycloud/excellenceCultivate/queryECPage",
    method: "post",
    data: data
  });

/*培育库-新增-保存*/
/*参数 {
  所有必填项
}*/

export const getCultivateAdd = data =>
  request({
    url: "/partycloud/excellenceCultivate/addEC",
    method: "post",
    data: data
  });

/*培育库-新增-组织名称*/
/*参数 {
}*/

export const getCultivateName = data =>
  request({
    url: "/partycloud/djOrg/djOrgList",
    method: "post",
    data: data
  });

/*培育库编辑*/

/*参数 {
}*/

export const getCultivateEdit = data =>
  request({
    url: "/partycloud/excellenceCultivate/editEC",
    method: "post",
    data: data
  });

/*培育库删除*/

/*参数 {
}*/

export const getCultivateDelete = data =>
  request({
    url: "/partycloud/excellenceCultivate/deleteEC",
    method: "post",
    data: data
  });

/*培育库-详情*/
/*参数 {
  id:''
}*/

export const getCultivateDetail = data =>
  request({
    url: "/partycloud/excellenceCultivate/queryECDetails",
    method: "post",
    data: data
  });

/* 培育库-导出*/
export const getCultivateExport = data => {
  let url = "/partycloud/excellenceCultivate/exportECExcel";
  commonReq.getHistoryExport(data, url);
};
