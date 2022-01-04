/**
 *  @author wangwei
 *  @description 党员发展统计
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/**
 * 党员发展数量统计
 */
export const getNumbertable = data =>
  request({
    url: "/partycloud/memberDevelopStatistical/countMemberDevelopNumber",
    method: "post",
    data
  });

/**
 * 党员发展统计总人数
 */
export const getallNumbertable = data =>
  request({
    url: "/partycloud/memberDevelopStatistical/countMemberDevelopTotalNumber",
    method: "post",
    data
  });

/**
 * 年龄学历分布图
 */
export const getAgetable = data =>
  request({
    url: "/partycloud/memberDevelopStatistical/countAgeEducationDistribution",
    method: "post",
    data
  });

/**
 * 工作岗位分布图
 */
export const getWorktable = data =>
  request({
    url: "/partycloud/memberDevelopStatistical/countJobsDistribution",
    method: "post",
    data
  });


/**
 * 党员民族、退役军人、性别分布图
 */
export const getNationtable = data =>
  request({
    url: "/partycloud/memberDevelopStatistical/countMemberNationSexRetired",
    method: "post",
    data
  });




