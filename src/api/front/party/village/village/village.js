/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 党员进小区API
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
export const getVillage = data =>
  request({
    url: '/partycloud/memberPlotActivity/findFrontPage',
    method: 'post',
    data: data
  })

/*前台-党员进小区报到统计详情
*
* 参数 {
* "id": 主键
*}
* */
export const villageInfo = data =>
  request({
    url: '/partycloud/memberPlotActivity/findOne',
    method: 'post',
    data: data
  })
