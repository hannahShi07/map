/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 园区概况API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";
// (未更换)
/*园区概况详情*/
export const getConspectusDetail = data =>
  request({
    url: "/partycloud/gardenGeneral/detail",
    method: "post",
    data: data
  });

/*园区概况更新数据*/
export const getConspectusUpdata = data =>
  request({
    url: "/partycloud/gardenGeneral/updateGarden",
    method: "post",
    data: data
  });


/*园区概况重置数据*/
export const getConspectusReset = data =>
  request({
    url: "/partycloud/gardenGeneral/selectGarden",
    method: "post",
    data: data
  });


