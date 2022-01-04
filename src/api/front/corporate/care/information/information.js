/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 企业信息API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";


/*前台统计图数据
* */
export const getInformationChars = data =>
  request({
    url: '/partycloud/enterprise/enterpriseCountFront',
    method: 'post',
    data: data
  })
//企业信息列表

export const getInformationList = data =>
  request({
    url: '/partycloud/enterprise/enterprisePageFront',
    method: 'post',
    data: data
  })
