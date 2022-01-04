/**
 *  @author wsw
 *  @description 综合研判
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";
/**
 * 获取党员体验
 */
export const getComprehensiveParty = data =>
  request({
    url: '/partycloud/djSynthesizeOrg/getMemberSetting',
    method: 'post',
    data
  })

/**
 * 获取组织体验
 */
export const getComprehensiveOrg = data =>
  request({
    url: '/partycloud/djSynthesizeOrg/getOrgSetting',
    method: 'post',
    data
  })
