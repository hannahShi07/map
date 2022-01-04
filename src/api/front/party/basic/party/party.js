/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 党组织架构API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";


/*党组织架构查询列表
*
* 参数 {
*  "current": 页数,
* "model": {
*    "categoryId": 0,
*   "code": "",
*  "name": ""
* },
* "size": 每页条数
*}
* */
export const getPartyList = data =>
  request({
    url: '/partycloud/djOrg/djOrgPage',
    method: 'post',
    data: data
  })
//前台-党组织框架统计
/*参数 {
  orgCode:''//组织编码
}*/

export const getPartystatistics = data =>
  request({
    url: '/partycloud/djOrg/categoryCount',
    method: 'post',
    data: data
  })

/*党组织架构 - 详情
*
* 参数{id:0}
*
* */
export const getPartydetail = data =>
  request({
    url: '/partycloud/djOrg/orgDetailFront',
    method: 'post',
    data: data
  })


/*党组织架构
*
* */
export const getPartyCategory = data =>
  request({
    url: '/partycloud/dict/findDictByOrgCategory',
    method: 'post',
    data: data
  })

/*党组织架构 - 前台
*
* */
export const getPartyOrglist = data =>
  request({
    url: '/partycloud/djOrg/partyList',
    method: 'post',
    data: data
  })

