/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 报道统计API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";


/*前台-党员进小区报到统计
*
* 参数 {
* "orgCode": 组织代码
*}
* */
export const getReport = data =>
  request({
    url: '/partycloud/memberPlot/countCategory',
    method: 'post',
    data: data
  })
