/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 党费管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";


/*前台统计图数据
*
* 参数 {
* "returnTime": 返还年份
* "orgCode": 组织代码
*}
* */
export const getUse = data =>
  request({
    url: '/partycloud/duesUse/getDuesUseCount',
    method: 'post',
    data: data
  })
//党费使用列表
/*参数 {
  current:0,
  model:{
    orgCode:'',//组织编码，前台参数后台传空
    useDate:'',//使用日期
  }，
  size:0
}*/

export const getUseList = data =>
  request({
    url: '/partycloud/duesUse/getDuesUseListts',
    method: 'post',
    data: data
  })

// 党费公示前台详情
export const getUseInfo = data =>
  request({
    url: '/partycloud/duesUse/getDuesUseDeatilQT',
    method: 'post',
    data: data
  })
  