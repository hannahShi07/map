/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 园区企业规模管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../../AxiosRequest.js";
import commonReq from "../../../../../public/commonReq.js";


/*新增保存*/
export const getpageAdd = data =>
  request({
    url: "/partycloud/companyScale/updateScale",
    method: "post",
    data: data
  });


/*详情查询*/
export const getpageDetail = data =>
  request({
    url: "/partycloud/companyScale/detail",
    method: "post",
    data: data
  });
