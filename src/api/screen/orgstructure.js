import request from '@/api/AxiosRequest'
import commonReq from '@/api/public/commonReq'

/**
 *  @author hanliyan
 *  @email 654993295@qq.com  2021、10、22
 *  @description 党建联盟组织架构API
 *  @data {{object} data 接口请求参数
 **/

// // 联盟党建联席会
//   export const getAlliancePartyData = data =>
//    request({
//     url: '/partycloud/unionMeeting/meetingPage',
//     method: 'post',
//     data
//   })

// 联盟会员
  export const getUnionData = data =>
    request({
    url: '/partycloud/unionMembers/memberPageFront',
    method: 'post',
    data
  })

// 查询联盟理事会和机构(大屏)
  export const getInquireData = data =>
    request({
    url: '/partycloud/unionCouncil/councilPageFront',
    method: 'post',
    data
  })
