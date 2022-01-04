/**
 *  @author wangwei
 *  @description 会议统计
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/**
 * 会议统计
 */
export const getMeetinglist = data =>
  request({
    url: "/partycloud/OrgLifeStatisticalController/findOrgLifeCount",
    method: "post",
    data
  });
