/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 党费管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//班子成员列表
export const getMembersList = data =>
  request({
    url: '/partycloud/leadership/leadershipPage',
    method: 'post',
    data: data
  })

/* 新增班子成员 */
export const addLeadership = data =>
request({
  url: '/partycloud/leadership/addLeadership',
  method: 'post',
  data: data
})

/* 删除 */
export const deleteMembersList = data =>
  request({
    url: '/partycloud/leadership/deleteLeadership',
    method: 'post',
    data: data
  })

/* 详情 */
export const membersInfo = data =>
request({
  url: '/partycloud/leadership/findLeadership',
  method: 'post',
  data: data
})


/* 新增 */
export const addMembersList = data =>
  request({
    url: '/partycloud/election/addElection',
    method: 'post',
    data: data
  })

// 获取查询组织最新一届换届选举
export const getNewElection = data =>
  request({
    url: '/partycloud/election/findNowElection',
    method: 'post',
    data: data
  })


// 获取班子成员选择成员
export const getSelectMember = data =>
  request({
    url: '/partycloud/leadership/selectMember',
    method: 'post',
    data: data
  })