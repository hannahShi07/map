/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 三会一课前台API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*党员大会图表统计查询*/

/*参数 {

}*/

export const getMeetingMember = data =>
  request({
    url: '/partycloud/orgLife/membershipMeetingCount',
    method: 'post',
    data: data
  })

/*党课教育图表统计查询*/

/*参数 {

}*/

export const getMeetingLesson = data =>
  request({
    url: '/partycloud/orgLife/partyClassCount',
    method: 'post',
    data: data
  })


/*支部党员大会图表统计查询*/

/*参数 {

}*/

export const getMeetingCouncil = data =>
  request({
    url: '/partycloud/orgLife/councilCount',
    method: 'post',
    data: data
  })




