/**
 *  @author wangwei
 *  @email 1140691919@qq.com
 *  @description 智慧政策API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";


//最新政策
export const newpolicyList = data =>
  request({
    url: '/partycloud/policy/wiseNewPolicyList',
    method: 'post',
    data: data
  })
//政策列表查询
export const outpolicyList = data =>
  request({
    url: '/partycloud/policy/wisePolicyList',
    method: 'post',
    data: data
  })
//区外根据id查询关联解读
// export const outpolicyrelatedList = data =>
//   request({
//     url: '/partycloud/WisePolicy/queryExplainByPolicyId',
//     method: 'post',
//     data: data
//   })
//推荐政策-详情接口
export const outpolicyDetail = data =>
  request({
    url: '/partycloud/policy/detailPolicy',
    method: 'post',
    data: data
  })

//推荐政策-统计数据
export const outpolicyStatistics = data =>
  request({
    url: '/partycloud/policy/wisePolicyStatistics',
    method: 'post',
    data: data
  })

//热点解读-列表接口
export const outpolicyHot = data =>
  request({
    url: '/partycloud/policy/wisePolicyStatisticsUnscrambleList',
    method: 'post',
    data: data
  })

//热点解读-详情接口
export const outpolicyHotdetail = data =>
  request({
    url: '/partycloud/policy/wisePolicyStatisticsUnscramble',
    method: 'post',
    data: data
  })


//推荐政策-精准匹配新增
export const preciseMatchingadd = data =>
  request({
    url: '/partycloud/PreciseMatching/add',
    method: 'post',
    data: data
  })

//推荐政策-精准匹配编辑
export const preciseMatchingedit = data =>
  request({
    url: '/partycloud/PreciseMatching/update',
    method: 'post',
    data: data
  })

//推荐政策-精准匹配详情
export const preciseMatchingdetail = data =>
  request({
    url: '/partycloud/PreciseMatching/detail',
    method: 'post',
    data: data
  })


//政策-相关热点
export const relatedpage = data =>
  request({
    url: '/partycloud/policy/readingList',
    method: 'post',
    data: data
  })
