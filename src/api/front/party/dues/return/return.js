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
export const getReturn = data =>
  request({
    url: '/partycloud/memberDuesBack/getDjMemberDuesBackCount',
    method: 'post',
    data: data
  })
//党费返还列表
/*参数 {
  current:0,
  model:{
    collectionDate:'',//缴纳年份
    orgCode:'',//组织编码，前台参数后台传空
    orgName:'',//组织名称，后台参数前台传空
  }，
  size:0
}*/

export const getRetrunList = data =>
  request({
    url: '/partycloud/memberDuesBack/getDjMemberDuesBackFrontList',
    method: 'post',
    data: data
  })

/*党费公示 - 详情
*
* 参数{id:0}
*
* */
export const getCollectionDetail = data =>
  request({
    url: '/partycloud/duesCollection/getDuesCollectionDeatil',
    method: 'post',
    data: data
  })
