/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 前台首页API
 *  @data {{object} data 接口请求参数
 **/
import request from "../AxiosRequest.js";
import commonReq from "../public/commonReq";

/*首页-统计设置详情*/

/*参数 {

}*/

export const getStatisticsset = data =>
  request({
    url: "/partycloud/statisticalSet/findStatisticalSetInfo",
    method: "post",
    data: data
  });

/*首页-年龄学历分布统计*/

/*参数 {

}*/

export const getStatisticseducation = data =>
  request({
    url: "/partycloud/homePage/countAgeEducationDistribution",
    method: "post",
    data: data
  });

/*首页-性别分布统计*/

/*参数 {

}*/

export const getStatisticssex = data =>
  request({
    url: "/partycloud/homePage/countSexDistribution",
    method: "post",
    data: data
  });

/*首页-党员按组织类型统计*/

/*参数 {

}*/

export const getStatisticsparty = data =>
  request({
    url: "/partycloud/homePage/memberCntByOrgType",
    method: "post",
    data: data
  });

/*首页-用户登录信息统计*/

/*参数 {

}*/

export const getStatisticsuser = data =>
  request({
    url: "/partycloud/homePage/userInfoCnt",
    method: "post",
    data: data
  });

/*首页-通知查询*/

/*参数 {
"current": 当前页数,
  "model": {
    'orgId':'',
		"articleSource": "",
		"articleTitle": "",
		"releaseTime": ""
  },
  "size": 每页条数
}*/

export const getFrontnotice = data =>
  request({
    url: "/partycloud/notice/orgFindPage",
    method: "post",
    data: data
  });

/*首页-消息查询*/

/*参数 {
"current": 当前页数,
  "model": {

  },
  "size": 每页条数
}*/

export const getFrontnews = data =>
  request({
    url: "/partycloud/sitemsg/findOrgMsgPage",
    method: "post",
    data: data
  });

/*首页-消息已读标识*/

/*参数 {
"current": 当前页数,
  "model": {

  },
  "size": 每页条数
}*/

export const getFrontreaded = data =>
  request({
    url: "/partycloud/sitemsg/tagRead",
    method: "post",
    data: data
  });

/*首页-未读消息统计*/
/*参数为空*/
export const getNewsnum = data =>
  request({
    url: "/partycloud/homePage/countMsg",
    method: "post",
    data: data
  });
