/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 站点管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../AxiosRequest.js";
import commonReq from "../../../public/commonReq";

//站点管理列表
export const getWeekList = data =>
  request({
    url: '/partycloud/broadcast/week/frontPage',
    method: 'post',
    data: data
  })
