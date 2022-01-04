/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 园区统计设置API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*园区统计设置*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getPacksetList = data =>
  request({
    url: "/partycloud/statisticalSet/findStatisticalSetInfo",
    method: "post",
    data: data
  });

/*园区统计设置保存*/
export const getPacksetSave = data =>
  request({
    url: "/partycloud/statisticalSet/saveStatisticalSet",
    method: "post",
    data: data
  });

/*园区统计设置自动获取*/
export const getPacksetAuto = data =>
  request({
    url: "/partycloud/statisticalSet/automaticSet",
    method: "post",
    data: data
  });


export const getPacksetListOther = data =>
  request({
    url: "/partycloud/statisticalSetOther/findStatisticalSetOtherInfo",
    method: "post",
    data: data
  });

/*园区统计设置保存*/
export const getPacksetSaveOther = data =>
  request({
    url: "/partycloud/statisticalSetOther/saveStatisticalSetOther",
    method: "post",
    data: data
  });
