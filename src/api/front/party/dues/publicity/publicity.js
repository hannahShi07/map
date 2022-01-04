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
* "noticeDate": 公示年份
* "orgCode": 组织代码
*}
* */
export const getDuesNotice = data =>
  request({
    url: '/partycloud/duesNotice/duesNoticeRateCount',
    method: 'post',
    data: data
  })
//党费公示列表
/*参数 {
  current:0,
  model:{
    noticeDate:'',//公示年份
    orgCode:'',//组织编码，前台参数后台传空
    orgName:'',//组织名称，后台参数前台传空
    title：'',//标题
  }，
  size:0
}*/

export const getPublicityList = data =>
  request({
    url: '/partycloud/duesNotice/getDuesNoticeFrontList',
    method: 'post',
    data: data
  })

/*党费公示 - 详情
*
* 参数{id:0}
*
* */
export const getPublicityDetail = data =>
  request({
    url: '/partycloud/duesNotice/getDuesNoticeDeatil',
    method: 'post',
    data: data
  })

