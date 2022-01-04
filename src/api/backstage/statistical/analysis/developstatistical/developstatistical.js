/**
 *  @author wangwei
 *  @description 党组织发展统计
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/**
 * 党组织分布
 */
export const getPartyfb = data =>
  request({
    url: "/partycloud/orgDevelopStatistical/countOrgDistribution",
    method: "post",
    data
  });

/**
 * 组织类型分布
 */
export const getPartytype = data =>
  request({
    url: "/partycloud/orgDevelopStatistical/countOrgTypeDistribution",
    method: "post",
    data
  });
