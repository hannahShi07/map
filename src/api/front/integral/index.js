/**
 *  @author hanliyan
 *  @description 积分统计
 **/
import request from "@/api/AxiosRequest";

/**
 * 党组织积分统计
 */
export const getOrgIntegral = data =>
  request({
    url: "/partycloud/IntegralStatistics/getOrgIntegral",
    method: "post",
    data
  });

/**
 * 党员积分统计
 */
export const getMemberIntegral = data =>
  request({
    url: "/partycloud/IntegralStatistics/getMemberIntegral",
    method: "post",
    data
  });

/**
 * 组织排名
 */
export const getOrgIntegralRanking = data =>
  request({
    url: "/partycloud/IntegralStatistics/getOrgIntegralRanking",
    method: "post",
    data
  });
